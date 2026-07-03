import Token from '../../utils/token.js'
let token = new Token();

import { checkAutorization } from "../../utils/auth.js"

import mysql from 'mysql'
import connectionParams from '../../configs/db-connection.js'

export let getUsers = async (req, response) => {
    let user = await checkAutorization(req, response);
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('SELECT id, email, roles, is_ban, date_add FROM `users` ORDER BY `users`.`id` DESC', function (err, users, fields) {
        if (err) {
            response.json({ ok: false, errors: [err.sqlMessage] });
            return;
        };
        response.json({ ok: true, data: users });
        connection.end();
        return;
    });
}

export let getUser = async (req, res) => {
    // get user in process!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    await checkAutorization(req, res);
    res.json({ ok: true, data: [`user for id ${req.body.id}`] });
}