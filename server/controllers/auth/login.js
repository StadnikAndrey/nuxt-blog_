import mysql from 'mysql'
import connectionParams from '../../configs/db-connection.js'
import bcrypt from 'bcrypt'
import Token from '../../utils/token.js'

export let login = function (request, response) {
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('SELECT * FROM `users` WHERE `email` =  ?', [request.body.email], function (err, user, fields) {
        if (err) {
            response.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        };
        if (user && user.length > 0) {
            bcrypt.compare(request.body.password, user[0].password, function (err, result) {
                if (result == true) {
                    if (user[0].is_ban == 1) {
                        response.json({ ok: false, errors: ['Your account has been blocked!'] });
                        connection.end();
                        return;
                    } else {
                        let token = new Token();
                        let refreshToken = token.createRefreshToken();
                        // a user cannot have more sessions than token.NUMBER_DEVICES                        
                        connection.query('SELECT * FROM `sessions` WHERE `id_user` =  ?', [user[0].id], async (err, sessions, fields) => {
                            if (err) {
                                response.json({ ok: false, errors: [err] });
                                connection.end();
                                return;
                            };
                            // if the number of sessions is greater than or equal to the maximum allowed
                            if (sessions && sessions.length >= token.NUMBER_DEVICES) {
                                sessions.sort((a, b) => {
                                    return Date.parse(b.date_add) - Date.parse(a.date_add);
                                });
                                let deleteSessions = sessions.slice(token.NUMBER_DEVICES - 1);
                                let idSessionForDelete = deleteSessions.map((el) => el.id);
                                await new Promise((resolve) => {
                                    connection.query('DELETE FROM `sessions` WHERE `id` IN (' + idSessionForDelete + ')', (err, res, fields) => {
                                        if (err) {
                                            response.json({ ok: false, errors: ['Error deleting from the session table when the user exceeds the number of devices', err] });
                                            connection.end();
                                            return;
                                        }
                                        resolve();
                                    })
                                })
                            }

                            let exp = new Date(Date.now() + token.REFRESH_EXP);
                            let data = {
                                id_user: user[0].id,
                                refresh_token: refreshToken,
                                exp: exp,
                                fingerprint: request.body.fingerprint
                            };
                            response.cookie('refreshToken', refreshToken, { expires: data.exp, httpOnly: true, path: '/api/refresh' });
                            connection.query('INSERT INTO `sessions` SET ?', data, function (err, result, fields) {
                                if (err) {
                                    response.json({ ok: false, errors: [err] });
                                    connection.end();
                                    return;
                                } else {
                                    user[0].id_session = result.insertId;
                                    let accessToken = token.createAccessToken(user[0]);
                                    response.json({ ok: true, data: accessToken });
                                    connection.end();
                                    return;
                                }
                            });
                        })
                    }
                } else {
                    response.json({ ok: false, errors: ['Please enter the correct password!'] });
                    connection.end();
                    return;
                }
            });
        } else {
            response.json({ ok: false, errors: ['Please enter the correct email and password!'] });
            connection.end();
            return;
        }
    });
};

export let logout = function (request, response) {
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('DELETE FROM `sessions` WHERE `id_user` = ? AND `id` = ?', [request.body.id, request.body.id_session], (err, result, fields) => {
        if (err) {
            response.json({ ok: false, errors: ['DB logout error (deleting from the session table)', err] });
            connection.end();
            return;
        }
        if (result.affectedRows > 0) {
            response.clearCookie('refreshToken', { httpOnly: true, path: '/api/refresh' });
            response.json({ ok: true });
            connection.end();
            return;
        } else {
            response.json({ ok: false, errors: ['Logout error (deletion from session table)', err] });
            connection.end();
            return;
        }
    })
};

export let logoutAllDevices = function (request, response) {
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('DELETE FROM `sessions` WHERE `id_user` =  ?', [request.body.id], (err, res, fields) => {
        if (err) {
            response.json({ ok: false, errors: ['Error logout all devices (deleting from the session table)', err] });
            connection.end();
            return;
        }
        response.clearCookie('refreshToken', { httpOnly: true, path: '/api/refresh' });
        response.json({ ok: true });
        connection.end();
        return;
    })
};