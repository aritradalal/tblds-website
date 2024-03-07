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
    switch (req.method) {
        case 'GET':
            if(req.url === '/') {
                readEJSFile('index.html', (err, data) => {
                    if(err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                });
            } else if(req.url.startsWith('/css')) {
                readFile(req.url.pathname.replace(`/^\//g`, `''`), (err, data) => {
                    if(err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Not Found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/css' });
                        res.end(data)
                    }
                })
            } else if(req.url.startsWith('/scripts')) {
                readFile(req.url.pathname.replace(`/^\//g`, `''`), (err, data) => {
                    if(err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Not Found');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/javascript' });
                        res.end(data)
                    }
                })
            } else if(req.url.startsWith('/images')) {
                readFile(req.url.pathname.replace(`/^\//g`, `''`), (err, data) => {
                    if(err) {
                        res.writeHead(404, { 'Content-Type': 'text/plain' });
                        res.end('Not Found');
                    } else {
                        res.writeHead(200, { 'Content-Type': mime.lookup(req.url.pathname) });
                        res.end(data)
                    }
                }) 
            } else if(req.url.startsWith('/')) {
            } else {}
            break;
        case 'POST':
            res.end('POST');
            break;
        default:
            res.writeHead(405)
            break;
    }
});

server.listen(80, () => { console.log('Server started at ', Date.now().toISOString()) })