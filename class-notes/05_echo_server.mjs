
// Socket:
// - A socket is one endpoint of a two-way communication link between two programs running on the network.
// - Mediates communication to a connected client or server

// net module:
// - A module that provides functions for creatiing servers and clients.
// - Creates a tcp/ip server. Can connect to this server with any client that supports tcp/ip.


// The following example creates a SERVER that listens for connections on port 3000.
// console.log(): server side logging
// sock.write(): client side logging

import {createServer} from 'net'; // We use net module!
const HOST = '127.0.0.1';
const PORT = 3000;


// cb function has a reference to client via arg passed in, convention is to call it sock
// or: handleConnect is a callback function specifying what to do when a client connects
const handleConnect = (sock) => { 
    console.log(`got connection from ${sock.remoteAddress}:${sock.remotePort}`);
    // sock methods: on, write, end, ...
    // on: event listener, can react to well-known events
    sock.on('data', (data) => handleData(data, sock)); // when data is received, call handleData (cb func)
    sock.on('close', () => console.log('connection closed'));
}


const handleData = (data, sock) => {
    console.log(data+''); // data is a buffer, so must convert it to a string
    sock.write('you sent:' + data); // send data back to client
    // sock.end(); // close the connection
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