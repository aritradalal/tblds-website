import crypto from 'crypto';
import http from 'http';
import postgres from 'postgres';
import fs from 'fs';

// Generate a http server that serves get and post requests
const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            res.end('GET');
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