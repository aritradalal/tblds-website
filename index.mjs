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
    switch(req.method) {
        case 'GET':
            if(req.url === '/') {
                readEJSFile('index.ejs', (err, data) => {
                    if(err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('500 Internal Server Error');
                        console.error(err);
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    }
                });
            } else {
                readFile(req.url, (err, data) => {
                    if(err) {
                        res.writeHead(404, {'Content-Type': 'text/plain'});
                        res.end('404 Not Found');
                    } else {
                        res.writeHead(200, {'Content-Type': mime.getType(req.url)});
                        res.end(data);
                    }
                });
            }
            break;
        default:
            res.writeHead(405, {'Content-Type': 'text/plain'});
            res.end('405 Method Not Allowed');
    }
});

server.listen(80, () => { console.log('Server started at ', new Date().toISOString()) });