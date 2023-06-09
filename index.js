const http = require('http');
const data = require('./data.js');

http.createServer((request, response) => {
    const method = request.method;
    const url = request.url;
    const bookId = url.split('/')[2];
    const category = url.split('/')[2];

    if (method === 'GET') {
        if (url.split('/')[1] === 'books') {
            if (category) {
                const catt = data.find((e) => e.category === category);
                if (catt) {
                    response.writeHead(200, {
                        'Content-Type': 'application/json'
                    });
                    response.end(JSON.stringify(catt));
                } else {
                    response.writeHead(404, {
                        'Content-Type': 'application/json'
                    });
                    response.end(JSON.stringify({
                        status: 404,
                        message: 'Kategoriya topilmadi'
                    }));
                }
                return;
            }
            if (!bookId) {
                response.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify(data));
                return;
            }
            const book = data.find((e) => e.id === bookId);
            if (!book) {
                response.writeHead(404, {
                    'Content-Type': 'application/json'
                });
                response.end(JSON.stringify({
                    status: 404,
                    message: http.STATUS_CODES[404]
                }));
                return;
            }
            response.writeHead(202, {
                'Content-Type': 'application/json'
            });
            response.end(JSON.stringify(book));
            return;
        }
        response.end('get method ...');
    } else {
        response.end('modificatio method');
    }
})
.listen(6000, () => {
    console.log('listening on port 6000...');
});
