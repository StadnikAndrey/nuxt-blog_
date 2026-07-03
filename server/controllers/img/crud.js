import formidable from "formidable";
import fs from 'node:fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { readdir } from 'node:fs/promises';

export let getImgs = async function (request, response) {
    try {
        const files = await readdir('./public/img');
        let names = [];
        for (const file of files) {
            names.push(file);
        }
        response.json({ ok: true, data: names });
    } catch (err) {
        console.error(err);
        response.json({ ok: false, data: 'error get imgs' });
    }
};

export let addImgs = function (request, response) {
    let form = formidable({ multiples: true });
    form.parse(request, (err, fields, files) => {
        if (err) {
            response.json({ ok: false, data: err });
            return;
        }
        let { imgs } = files;
        let arrImgs = [];
        if (Array.isArray(imgs)) {
            arrImgs = imgs;
        } else {
            arrImgs.push(imgs);
        }
        try {
            for (let item of arrImgs) {
                let data = fs.readFileSync(item.filepath);
                let filePath = path.resolve(`./public/img/`, item.originalFilename);
                let unicName = uuidv4() + path.extname(filePath);
                let pathUpload = path.resolve(`./public/img/`, unicName);
                fs.writeFileSync(pathUpload, data);
                fs.unlinkSync(item.filepath);
            }
            response.json({ ok: true, data: 'images saved successfully' });
        } catch (error) {
            response.json({ ok: false, data: 'an error occurred on the server while saving images' });
        }
    });

};