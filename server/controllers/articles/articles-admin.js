import fs from 'fs'
import path from 'node:path'
import mysql from 'mysql'
import connectionParams from '../../configs/db-connection.js'

import { checkAutorization } from "../../utils/auth.js"

export const getArticles = async (req, response) => {
    let user = await checkAutorization(req, response);
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('SELECT  articles.*, users.email AS author FROM `articles` INNER JOIN `users`  ON `articles`.`id_user` = `users`.`id` ORDER BY `articles`.`date_add` DESC', function (err, articles, fields) {
        if (err) {
            response.json({ ok: false, errors: [err.sqlMessage] });
            return;
        };
        articles.map(item => {
            item.head = JSON.parse(item.head);
        });
        response.json({ ok: true, data: articles });
        connection.end();
        return;
    });
}

export const toggleDisplayArticle = async (req, response) => {
    let user = await checkAutorization(req, response);
    let connection = mysql.createConnection(connectionParams);
    connection.connect();
    connection.query('UPDATE articles SET display = ? WHERE id = ?', [req.body.display, req.body.id], function (err, reults, fields) {
        if (err) {
            response.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        };
        response.json({ ok: true });
        connection.end();
        return;
    });
}

export const deleteArticle = async (req, response) => {
    let user = await checkAutorization(req, response);
    let connection = mysql.createConnection(connectionParams);
    connection.connect();
    connection.query('DELETE FROM articles WHERE id = ?', [req.body.id], function (err, reults, fields) {
        if (err) {
            response.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        };
        response.json({ ok: true });
        connection.end();
        return;
    });
}

export const getArticle = async (req, res) => {
    let user = await checkAutorization(req, res);
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('SELECT * FROM `articles` WHERE `id` =  ?', [req.body.id], function (err, article, fields) {
        if (err) {
            res.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        };
        try {
            article[0].head = JSON.parse(article[0].head);
            res.json({ ok: true, data: article[0] });
            connection.end();
            return;
        } catch (error) {
            res.status(404).json({ ok: false });
            connection.end();
            return;
        }

    });
}

export const insertArticle = async (req, res) => {
    let user = await checkAutorization(req, res);
    let data = {
        id_user: user.id,
        head: JSON.stringify(req.body.head),
        body: req.body.body,
        display: 0
    }
    let connection = mysql.createConnection(connectionParams);
    connection.connect();
    connection.query('INSERT INTO `articles` SET ?', data, function (err, result, fields) {
        if (err) {
            res.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        }
        res.json({ ok: true });
        connection.end();
        return;
    });
}

export const updateArticle = async (req, res) => {
    let user = await checkAutorization(req, res);
    let data = {
        id: req.body.id,
        head: JSON.stringify(req.body.head),
        body: req.body.body
    }
    let connection = mysql.createConnection(connectionParams);
    connection.connect();
    connection.query('UPDATE `articles` SET head = ?, body =? WHERE id = ?', [data.head, data.body, data.id], function (err, result, fields) {
        if (err) {
            res.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        }
        res.json({ ok: true });
        connection.end();
        return;
    });
}