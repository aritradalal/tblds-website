import crypto from 'crypto';
import http from 'http';
import postgres from 'postgres';
import fs from 'fs';

// Generate a http server that serves get and post requests
const server = http.createServer((req, res) => {
    switch (req.method) {
        case 'GET':
            switch(req.url) {
                case '/':
                    const filePath = path.join(__dirname, 'html', 'index.html', (err, data) => {
                        if(err) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal Server Error');
                        } else {
                            res.writeHead(200, {'Content-Type': 'text/html'});
                            res.end(data);
                        }
                    });
                    break;
                default:
                    res.end('Not Found');
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