

// In 05_echo_server, we built a client from the netcat.
// But in order to respond to a browser client, our server should be able to speak in a HTTP protocol.
// We will still build an echo server.

import {createServer} from 'net'; // We use net module!
const HOST = '127.0.0.1';
const PORT = 3000;


const handleConnect = (sock) => { 
    console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
    // sock methods: on, write, end, ...
    // on: event listener, can react to well-known events
    sock.on('data', (data) => handleData(data, sock)); // when data is received, call handleData (cb func)
    // (automatically passes data as argument to a callback func, and inside that cb func, call handleData)
    // use bind??? handleData.bind(null, sock) => see lost treasures - bind
    sock.on('close', () => console.log('connection closed'));
}


const handleData = (data, sock) => {
    console.log(data+''); // data is a buffer, so must convert it to a string
    // sock.write('you sent:' + data); // send data back to client

    // when browser connects to server, it sends a request message
    // the server has to sen back a response that meets the http protocol
    sock.write('HTTP/1.1 200 OK\r\n');
    sock.write('Content-Type: text/html\r\n');
    sock.write('\r\n');
    sock.write('<h1>hello browser, this is what you sent me</h1><pre>' + data + '</pre>'); // data gets automatically converted to string

    // sock.end(); // close the connection
}



// create a server and pass in a callback function to handle connections
const server = createServer(handleConnect); // returns a server object

console.log('starting server');
server.listen(PORT, HOST); // start listening for any connections on port 3000
console.log('server started at portal', PORT);

