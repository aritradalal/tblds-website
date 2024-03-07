import crypto from 'crypto';
import http from 'http';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import mime from 'mime';

const html = 'html';
const cachecleanupms = 5 * 60 * 1000;

function readEJSFile(urlPath, callback) {
    fs.readFile(path.join(html, urlPath), (err, data) => {
        if(err) {
            callback(err);
        } else {
            const rendered = ejs.render(data);
            callback(null, rendered);
        }
    });
}

function readFile(urlPath, callback) {
    fs.readFile(path.join(html, urlPath), (err, data) => {
        if(err) {
            callback(err);
        } else {
            callback(null, data);
        }
    });
}

// Generate a http server that serves get and post requests
const server = http.createServer((req, res) => {
    console.log('Requested URL Path: ', req.url);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Works');
});

server.listen(80, () => { console.log('Server started at ', new Date().toISOString()) });