import formidable from "formidable";
import fs from 'node:fs';
import path from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { readdir } from 'node:fs/promises';

export let getAllVideo = async function (request, response) {
    try {
        const files = await readdir('./public/video');
        let names = [];
        for (const file of files) {
            names.push(file);
        }
        response.json({ ok: true, data: names });
    } catch (err) {
        console.error(err);
        response.json({ ok: false, data: 'error get all video' });
    }

};

export let addVideo = function (request, response, next) {
    let form = formidable({ multiples: true });

    form.parse(request, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        let { chunk } = files;
        let { finish, size, offset } = fields;

        let tempFilePath = path.resolve(`./public/temp/`, chunk.originalFilename);
        let fileStream = fs.createWriteStream(tempFilePath, {
            flags: 'a'
        });
        fileStream.on('error', () => {
            response.status(500).json({ ok: false, data: 'an error occurred on the server while saving video' });
        });
        let data = fs.readFileSync(chunk.filepath);

        let targetFile = fs.statSync(tempFilePath, { throwIfNoEntry: false });
        if (targetFile == undefined || targetFile.size == offset) {
            await fileStream.write(data, async () => {
                fileStream.destroy();
                if (finish == 1) {
                    let newFilePath = path.resolve(`./public/video/`, chunk.originalFilename);
                    await fs.rename(tempFilePath, newFilePath, (err) => {
                        if (err) {
                            console.log('error rename (1)', err);
                            response.status(500).json({ ok: false, data: 'error rename file video (1)' });
                        };
                        console.log('Rename complete! (1)');
                        response.json({ ok: true, data: { message: 'video saved successfully' } });
                    });
                } else {
                    let fd = fs.openSync(tempFilePath);
                    let bytes = fs.readSync(fd, fs.readFileSync(tempFilePath));
                    fs.closeSync(fd);
                    response.json({ ok: true, data: { bytes: bytes, message: 'video chunk saved successfully' } });
                }
            });
            console.log(1);
        } else if (targetFile.size < size) {
            response.json({ ok: true, data: { bytes: targetFile.size, message: 'continue uploading video not from the beginning' } });
            fileStream.destroy();
            console.log(2);
        } else {
            await fileStream.destroy();
            await fs.rename(tempFilePath, path.resolve(`./public/video/`, chunk.originalFilename), (err) => {
                if (err) {
                    console.log('error rename (3)', err);
                    response.status(500).json({ ok: false, data: 'error rename file video (3)' });
                };
                console.log('Rename complete! (3)');
                response.json({ ok: true, data: { message: 'video saved successfully (3)' } });
            });
            console.log(3);
        }
        fs.unlinkSync(chunk.filepath);
    });
};

// to upload multiple files of any size at once (do not delete!!!!!!!)
export let addVideo__ = function (request, response, next) {
    let form = formidable({ multiples: true });
    form.options.maxFileSize = 9999999999999999999999999999999;
    form.parse(request, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        let { video } = files;
        let arrVideo = [];
        if (Array.isArray(video)) {
            arrVideo = video;
        } else {
            arrVideo.push(video);
        }
        try {
            for (let item of arrVideo) {
                let data = fs.readFileSync(item.filepath);
                let pathUpload = path.resolve(`./public/video/`, item.originalFilename);
                fs.writeFileSync(pathUpload, data);
                fs.unlinkSync(item.filepath);
            }
            response.json({ ok: true, data: 'images saved successfully' });
        } catch (error) {
            response.json({ ok: false, data: 'an error occurred on the server while saving images' });
        }
    });
};