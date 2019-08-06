const http = require('http');
const fs = require('fs');

fs.readFile('./index.html', (err, res) => {

    if (err) throw err;

    http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(res);
        response.end();
    }).listen(8888);
});
