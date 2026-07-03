import mysql from 'mysql'
import connectionParams from '../../configs/db-connection.js'
import bcrypt from 'bcrypt'
import Token from '../../utils/token.js'
let token = new Token();

export let check = function (request, response) {
    let header = request.get('Authorization');
    let tokenAutorization = token.readToken(header);
    if (tokenAutorization != null) {
        try {
            let tokenData = token.getTokenData(tokenAutorization);
            if (tokenData.exp > Date.now()) {
                response.json({ ok: true, data: tokenAutorization });
            } else {
                response.status(401).json({ ok: true });
            }
        } catch (e) {
            response.clearCookie('refreshToken', { httpOnly: true, path: '/api/refresh' });
            response.json({ ok: false });
        }
    } else {
        response.clearCookie('refreshToken', { httpOnly: true, path: '/api/refresh' });
        response.json({ ok: false });
    }
};

export let refresh = function (request, response) {
    let RT = request.cookies.refreshToken;
    let tokenData = null;
    let header = request.get('Authorization');
    let AT = token.readToken(header);
    let fingerprint = request.get('fp');
    if (AT != null) {
        try {
            tokenData = token.getTokenData(AT);
        } catch (e) {
            console.log(e)
        }
    }
    let connection = mysql.createConnection(connectionParams);
    connection.connect();
    if (RT != undefined && tokenData != null) {
        connection.query('SELECT * FROM `sessions` WHERE `id_user` = ? AND `refresh_token` =  ? AND `fingerprint` = ?', [tokenData.id, RT, fingerprint], (err, res, fields) => {
            if (err) {
                response.json({ ok: false, errors: ['DB error retrieving user via RT from sessions table', err] });
                connection.end();
                return;
            }
            if (res && res.length > 0 && Date.parse(res[0].exp) > Date.now()) {
                connection.query('SELECT * FROM `users` WHERE `id` =  ?', [res[0].id_user], (err, user, fields) => {
                    if (err) {
                        response.json({ ok: false, errors: ['DB error retrieving user by RT from user table', err] });
                        connection.end();
                        return;
                    }

                    if (user && user[0].is_ban === 0) {
                        let refreshToken = token.createRefreshToken();
                        let exp = new Date(Date.now() + token.REFRESH_EXP);
                        let data = {
                            id_user: user[0].id,
                            refresh_token: refreshToken,
                            exp: exp,
                            fingerprint: fingerprint
                        };
                        response.cookie('refreshToken', refreshToken, { expires: data.exp, httpOnly: true, path: '/api/refresh' });
                        connection.query('INSERT INTO `sessions` SET ?', data, function (err, result, fields) {
                            if (err) {
                                response.json({ ok: false, errors: [err] });
                                connection.end();
                                return;
                            }
                            // Delete a record for a user with an old RT
                            connection.query('DELETE FROM `sessions` WHERE `refresh_token` =  ?', [RT], (err, res, fields) => {
                                if (err) {
                                    response.json({ ok: false, errors: ['Error deleting from session table', err] });
                                    connection.end();
                                    return;
                                }
                            })
                            user[0].id_session = result.insertId;
                            let accessToken = token.createAccessToken(user[0]);
                            response.json({ ok: true, data: accessToken });
                            connection.end();
                            return;
                        });
                    } else {
                        // Delete a record for a user with an old RT
                        connection.query('DELETE FROM `sessions` WHERE `refresh_token` =  ?', [RT], (err, res, fields) => {
                            if (err) {
                                response.json({ ok: false, errors: ['Error deleting from session table', err] });
                                connection.end();
                                return;
                            }
                        })
                        response.clearCookie('refreshToken', { httpOnly: true, path: '/api/refresh' });
                        response.json({ ok: false, errors: ['The user has been banned'] });
                        connection.end();
                        return;
                    }
                })

            } else {
                // Delete a record for a user with an old RT
                connection.query('DELETE FROM `sessions` WHERE `refresh_token` =  ?', [RT], (err, res, fields) => {
                    if (err) {
                        response.json({ ok: false, errors: ['Error deleting from session table', err] });
                        connection.end();
                        return;
                    }
                })
                response.clearCookie('refreshToken', { httpOnly: true, path: '/api/refresh' });
                response.json({ ok: false });
                connection.end();
                return;
            }
        })
    } else {
        response.json({ ok: false });
        connection.end();
        return;
    }
};