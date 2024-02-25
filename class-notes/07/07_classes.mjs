
// wrap as a reusable module, hide the implementation details
// the only functionaility exposed are addRoutes and listion on a port and host

// Request class
// Response class
// App class (just need to create a new App object and call functions)

// "private" instance variables

class Request { // for parsing the request message, so that we can generate different response for different requests
    constructor(s) {
        // GET /foo.html HTTP/1.1 -> ['GET', '/foo.html', 'HTTP/1.1']
        const [method, path] = s.split(' '); // we don't need the rest of the array
        this.method = method;
        this.path = path;

    }
    
    toString() {
        return `${this.method} ${this.path}`;
    }

}


import {readFile} from 'fs';

class Response { // for generating the response
    constructor(sock, statusCode=200, desc='OK', contentType='text/html') {
        this.sock = sock;
        this.statusCode = statusCode;
        this.desc = desc;
        this.contentType = contentType;
    }

    sendFile(fn) { // filename
        readFile(fn, (err, data) => {
            if (err) {
                this.statusCode = 500;
                this.desc = 'Server Error';
                this.send('Ahh oh.');
            } else {
                this.send(data+'');
            }
        })
    }


    render(templatePath, context) {
        readFile(templatePath, (err, data) => {
            if (err) {
                this.statusCode = 500;
                this.desc = 'Server Error';
                this.send('Ahh oh.');
            } else {
                // data: what is in the .template file, remember to turn it into string
                // context: the object of key-value pairs that we want to fill into the template
                // remember to match the number of properties of the objects in the template and the passed-in context
                const body = Object.entries(context).reduce((html, pair) => {
                    const [key, value] = pair;
                    return html.replace('{{' + key + '}}', value);
                }, data+'');
                this.send(body);
            }
        })
    }

    send(body) {
        this.sock.write(`HTTP/1.1 ${this.statusCode} ${this.desc}\r\n`);
        this.sock.write(`content-type: ${this.contentType}\r\n`);
        this.sock.write('\r\n');
        this.sock.write(body);
        this.sock.end();
    }
}


class App {
    constructor() {
        this.routes = {};
        this.server = createServer(sock => this.handleConnect(sock));

        // this.handleConnect is invoked as a regular function call
        // if you see `this` inside handleConnect, it will be undefined
        // how to fix this?
        // 1. bind it
        // 2. use an arrow function (arrow functions don't have their own `this`, they use the `this` from the surrounding scope)

        // regular function (wrong)
        // this.server = createServer(this.handleConnect); // wrong

        // arrow function
        // this.server = createServer(sock => this.handleConnect(sock)); // correct
        // bind
        // this.server = createServer(this.handleConnect.bind(this)); // correct
    }

    get(path, cb) {
        // adding a new route about what to sent when receiving a request path
        this.routes[path] = cb;
    }

    listen(port, host) {
        this.server.listen(port, host);
        console.log('server started at portal', PORT);
    }
    
    handleConnect(sock) { 
        console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
        sock.on('data', (data) => this.handleData(data, sock)); 
        sock.on('close', () => console.log('connection closed\n'));
    }

    handleData(data, sock) {
        const req = new Request(data+'');
        console.log('received request');
        console.log('path:', req.path);
    
        const res = new Response(sock); // need to specify which sock does this RES replys to.
        if (Object.hasOwn(this.routes, req.path)) {
            this.routes[req.path](req, res);
        } else {
            res.statusCode = 404;
            res.desc = 'Not Found';
            res.contentType = 'text/plain'; // no need for html format
            res.send('Ahh oh.')
        }
        // sock.end(); // close the connection
        // may cause write after end error (due to async nature of readFile)
    }
}





import {createServer} from 'net'; // We use net module!
const HOST = '127.0.0.1';
const PORT = 3000;



// export {App}; // export the App class as a module

export default App; // export the App class as a module 