const http = require('http');
const httpProxy = require('http-proxy');

const routes = {
    '/api': 'http://localhost:3000',
    '/dashboard': 'http://localhost:4000',
    '/auth': 'http://localhost:5000',
};

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res)=> {
    const path = req.url.split('/')[1];

    if(routes[path]) {
        proxy.web(req, res, {target: routes[path] });
    } else{
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Not Found')
    }
});

server.listen(8080, () =>{
    console.log('Reverse proxy server running on port 8080');
});