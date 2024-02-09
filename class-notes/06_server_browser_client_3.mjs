
// Socket:
// - A socket is one endpoint of a two-way communication link between two programs running on the network.
// - Mediates communication to a connected client or server

// net module:
// - A module that provides functions for creatiing servers and clients.
// - Creates a tcp/ip server. Can connect to this server with any client that supports tcp/ip.


// The following example creates a SERVER that listens for connections on port 3000.
// console.log(): server side logging
// sock.write(): client side logging




class Request {
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



class Response {
    constructor(sock, statusCode=200, desc='OK', contentType='text/html') {
        this.headers = {};
        this.body = '';
    }

    setHeader(name, value) {
        this.headers[name] = value;
    }

    write(data) {
        this.body += data;
    }

    end() {
        console.log('sending response');
        console.log('HTTP/1.1 200 OK');
        console.log(this.headers);
        console.log(this.body);
    }
} // 10:15 -- 2 pics
// complete: 10:17


import {createServer} from 'net'; // We use net module!
const HOST = '127.0.0.1';
const PORT = 3000;

const Routes = {
    '/chug': (req, res) => {res.send('<html><body><h1>chug</h1></body></html>');},
    '/chug2': (req, res) => {res.send('<html><body><h1>chug2</h1></body></html>');},
    '/hello': (req, res) => {res.send('<html><body><h1>hello!!!</h1></body></html>');}
} // 10:24


// cb function has a reference to client via arg passed in, convention is to call it sock
// or: a callback function specifying what to when a client connects
const handleConnect = (sock) => { 
    console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
    // sock methods: on, write, end, ...
    // on: event listener, can react to well-known events
    sock.on('data', (data) => handleData(data, sock)); // when data is received, call handleData (cb func)
    // use bind??? handleData.bind(null, sock)
    sock.on('close', () => console.log('connection closed'));
}


const handleData = (data, sock) => {
    const req = new Request(data+'');
    if (req.path === '/chug') {
        sock.write('HTTP/1.1 200 OK\r\n');
        sock.write('Content-Type: text/html\r\n');
        sock.write('\r\n');
        sock.write('<html><body><h1>chug</h1></body></html>');
        sock.end();
    } else if (req.path === '/chug2') {
        sock.write('HTTP/1.1 200 OK\r\n');
        sock.write('Content-Type: text/html\r\n');
        sock.write('\r\n');
        sock.write('<html><body><h1>chug2</h1></body></html>');
        sock.end();

    } else {
        sock.write('HTTP/1.1 404 Not Found\r\n');
        sock.write('Content-Type: text/html\r\n');
        sock.write('\r\n');
        sock.write('<html><body><h1>404 Not Found</h1></body></html>');
        sock.end();

    }

    console.log('-----------', req.path);
    console.log('REQQQQQQ', req + ''); 

    // when browser connects to server, it sends a request message
    // the server has to sen back a response that meets the http protocol
    sock.write('HTTP/1.1 200 OK\r\n');
    sock.write('Content-Type: text/html\r\n');
    sock.write('\r\n');
    sock.write('<h1>hello</h1><pre>' + req + '</pre>');
    sock.end(); // close the connection
}



// create a server and pass in a callback function to handle connections
const server = createServer(handleConnect); // returns a server object

console.log('starting server');
server.listen(PORT, HOST); // start listening for any connections on port 3000
console.log('server started');



// [def] echo server:
// - listen for connections,
// - when it receives data, it sends it back to the client
// The above example is an echo server.

// 10:00