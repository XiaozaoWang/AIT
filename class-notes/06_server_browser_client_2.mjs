
class Request { // for parsing the request message, so that we can generate different response for different requests
    constructor(s) {
        // GET /foo.html HTTP/1.1 -> ['GET', '/foo.html', 'HTTP/1.1']
        const [method, path, ...everythingElse] = s.split(' ');
        this.method = method;
        this.path = path;

    }
    
    toString() {
        return `${this.method} ${this.path}`;
    }

}



class Response { // for generating the response
    constructor(sock, statusCode=200, desc='OK', contentType='text/html') {
        this.sock = sock;
        this.statusCode = statusCode;
        this.desc = desc;
        this.contentType = contentType;
    }

    send(body) {
        this.sock.write(`HTTP/1.1 ${this.statusCode} ${this.desc}\r\n`);
        this.sock.write(`content-type: ${this.contentType}\r\n`);
        this.sock.write('\r\n');
        this.sock.write(body);
    }
}


import {createServer} from 'net'; // We use net module!
const HOST = '127.0.0.1';
const PORT = 3000;

// A dictionary of functions for sending different response on differnt request PATH
const routes = {
    '/want_apple': function(req, res) {res.send('<h1>Apple</h1>')},
    '/want_banana': function(req, res) {res.send('<h1>Banana</h1>')},
    '/want_cat': function(req, res) {res.send('<h1>No way</h1>')},
}


const handleConnect = (sock) => { 
    console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
    sock.on('data', (data) => handleData(data, sock)); 
    sock.on('close', () => console.log('connection closed\n'));
}


const handleData = (data, sock) => {
    const req = new Request(data+'');
    console.log('received request');
    console.log('path:', req.path);

    const res = new Response(sock); // need to specify which sock does this RES replys to.
    if (Object.hasOwn(routes, req.path)) {
        routes[req.path](req, res);
    } else {
        res.statusCode = 404;
        res.desc = 'Not Found';
        res.contentType = 'text/plain'; // no need for html format
        res.send('Ahh oh.')
    }
    sock.end(); // close the connection
}



// create a server and pass in a callback function to handle connections
const server = createServer(handleConnect); // returns a server object

console.log('starting server');
server.listen(PORT, HOST); // start listening for any connections on port 3000
console.log('server started at portal', PORT);

