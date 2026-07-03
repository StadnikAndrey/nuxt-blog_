import mysql from 'mysql'
import connectionParams from '../../configs/db-connection.js'
import bcrypt from 'bcrypt'

export let registration = function (request, response) {
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(request.body.password, salt, function (err, hash) {
            // Store hash in your password DB.
            let data = {
                email: request.body.email,
                password: hash
            }

            let connection = mysql.createConnection(connectionParams);

            connection.connect();

            connection.query('SELECT * FROM `users` WHERE `email` =  ?', [data.email], function (err, res, fields) {
                if (err) {
                    response.json({ ok: false, errors: [err.sqlMessage] });
                    return;
                };
                if (res && res.length > 0) {
                    response.json({ ok: false, errors: ['A user with this email already exists!'] });
                    return;
                } else {
                    connection.query('INSERT INTO `users` SET ?', data, function (err, result, fields) {
                        if (err) {
                            response.json({ ok: false, errors: [err.sqlMessage] });
                            return;
                        } else {
                            response.json({ ok: true });
                            return;
                        }
                    });
                }

                connection.end();
            });
        });
    });
}; 