import crypto from 'crypto';
import http from 'http';
import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

const html = 'html';

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
            switch(req.url) {
                case '/':
                    readFile('index.html', (err, data) => {
                        if(err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain'});
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/html'});
                            res.end(data);
                        }
                    });
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain'});
                    res.end('File Not Found');
                    break;
            }
            break;
        case 'POST':
            res.end('POST');
            break;
        default:
            res.end('Not Found');
            break;
    }
});

server.listen(80, () => { console.log('Server started at ', Date.now()) })