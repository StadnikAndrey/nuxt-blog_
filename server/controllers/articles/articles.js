import mysql from 'mysql'
import connectionParams from '../../configs/db-connection.js'

export const getArticles = (req, response) => {
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('SELECT * FROM `articles` WHERE `display`=1 ORDER BY `id` DESC', function (err, articles, fields) {
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

export const getArticle = (req, res) => {
    let connection = mysql.createConnection(connectionParams);

    connection.connect();

    connection.query('SELECT * FROM `articles` WHERE `id` =  ?', [req.query.id], function (err, article, fields) {
        if (err) {
            res.json({ ok: false, errors: [err.sqlMessage] });
            connection.end();
            return;
        };
        if (article[0] && article[0].head) {
            article[0].head = JSON.parse(article[0].head);
            res.json({ ok: true, data: article[0] });
        } else {
            res.status(404).json({ ok: false, errors: ['article not found'] });
        }

        connection.end();
        return;
    });
} 