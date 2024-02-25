// ///////////////////////////////////////////////////////////////////////

// Web vs internet

// ///////////////////////////////////////////////////////////////////////

// Web vs internet
// ------------------------------
// 1. Internet: global network of networks
// - protocols (tcp/ip stack)
// Can id computer via IP addresses


// 2. Web: An application built on top of the internet.
// reseources (html, css, js, images, ...) are addressable via URLs,
// and linked via hyperlinks.
// - protocols (http) (application layer protocol)

// 3. Other application layers on the internet:
// (they are network protocols - ways of communicating over a network)
// email (smtp)
// file transfer protocol (ftp)
// chat (XMPP, OSCAR, IRC)
// voice (SIP, Skype protocol)
// web sockets
// telnet
// ssh

// ------------------------------
// * What is a protocol?
// A set of rules for communication between computers.
// Below can be called the [tcp/ip stack]
// 1. application layer protocol: http, smtp, ftp, ...
// 2. transport layer: tcp, udp
// 3. network layer: ip
// 4. link layer: ethernet, wifi
// [http] -> [tcp] -> [ip] -> [ethernet] -> [cable]


// ------------------------------
// Sending a message over the internet
// 1. messages start at the top of the stack and work downward
// 2. each layer that the message passes through may break the message up into smaller chunks of more manageable data called [packets]
// 3. packets go through the Application Layer and continue to the Transport Layer 
//      where each packet is assigned a [port number] 
//      (loosely speaking a number that specifies [which program on the destination computer needs to receive the message])
// 4. packets then proceed to the Network Layer, where each packet receives its destination IP address 
//      (number that [identifies a computer on the network])
// 5. with a [port number] and an [IP address], the hardware layer turns packets of data into electronic signals and transmits them



// ///////////////////////////////////////////////////////////////////////

// HTTP

// ///////////////////////////////////////////////////////////////////////

// ------------------------------
// Web definition again:
// A collection of interconnected documents (web pages) and other resources (images), 
// retrievable by url and connected by hyperlinks.


// ------------------------------
// URL (Universal Resource Locator)
// example: http://www.google.com:80/search?q=hello
// structure: protocol://domain:port/path
// - protocol: http
// - domain / actual ip address: www.google.com / 127.0.0.1
// - port: 80
// - path: /search
// - query string: ?q=hello
// - fragment: #section1

// Domains and IP addresses
// Each machine on the internet has a unique IP address
// However, ipv4 addresses are running out (32 bit - 4 billion)
// ipv6: 128 bit
// And we use NAT to share a single public IP address among many devices in a local network
// --------
// DNS (Domain Name System)
// - a distributed database that maps domain names to IP addresses
// e.g. localhost -> 127.0.0.1
// domains are just more human readable


// well known ports
// - 80: http (default)
// - 443: https
// - 21: ftp
// - 22: ssh



// ------------------------------
// http:
// protocol for the web
// - a request-response protocol
// - involves client/server (two main actors)
// http before v2: text based
// after v2: binary based (currently 2/3?)
// same semantics

// -----1-----
// [client] makes a request to retrieve a resource from a server
// What can be a client?
// - browser: chrome, firefox, safari, ...
// - mobile app: facebook, twitter, ...
// - cmd-line tools: netcat, curl, wget
// - API lib/modules: python requests, node-fetch, axios, ...
//  ... (make ur own)

// -----2-----
// [server] sends a response
// - cots: apache, nginx, ...
// make ur own: node, express (localhost: that's a server!)
// application servers: webrick in java, gunicorn in python


// ------------------------------
// The process of request-response action:
// 1. the browser attempts to connect to the address of the server
// 2. if the server is listening and reachable, a TCP connection is made between the server and the client on port 80 (the default port for HTTP traffic)
// 3. the browser sends a [request message]
// 4. on the same connection, the web server gives back a [response message]



// ------------------------------
// ***A request message!***
// It consists of: request line, headers, and an optional body
// 1. Request line: GET /foo.html HTTP/1.1\r\n (http method, path, http version. \r\n is a new-line character)
// 2. Headers: Host: www.example.com, User-Agent: my browser, ... \r\n (key-value pairs)
// 3. Body: (optional) (e.g. data for a POST request)


// -----
// request methods: (tells the server what action perform on the identified resource)
// GET: just reading data
// POST: requests that the server accept the data in the request for storage (creating data)

// Others: (an api may require that you use a certain method to make a request)
// PUT
// DELETE
// HEAD

// ------------------------------
// ***A response message!***
// It consists of: status line, headers, and an optional body
// 1. Status line: HTTP/1.1 200 OK\r\n (http version, status code, description)
// 2. Headers: Content-Type: text/html (or: text/css, image/jpeg), 
//             Content-Length: len, 
//             Location: (the url to redirect to for 3xx status codes) 
//             ... \r\n (key-value pairs)
// 3. Body: (optional) (e.g. the html of a web page)

// -----
// status codes (indicates the result of the request) (3 digit)
// 200: ok
// 404: not found
// 500: internal server error
// 502: bad gateway

// 1xx: informational (request received, continuing process)
// 2xx: success (request received, understood, and accepted)
// 3xx: redirect  (further action must be taken to complete the request)
// 4xx: client error - same request will yield same response
// 5xx: server error - same request may yield different response ... later




// ------------------------------
// A sample interaction

// 1. Request
// GET /teaching/ HTTP/1.1
// Host: jvers.com
// Connection: keep-alive
// Cache-Control: max-age=0
// User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36
// Accept-Language: en-US,en;q=0.8
// (except for line 1, these are all headers!!)

// 2. Response
// HTTP/1.1 200 OK
// Date: Thu, 18 Feb 2016 15:23:39 GMT
// Server: Apache/2.2.15 (Red Hat)
// Accept-Ranges: bytes
// Content-Length: 163
// Content-Type: text/html; charset=UTF-8
// Set-Cookie: STATICSERVERID=s3; path=/
// Cache-control: private

// <h2>Check out my fancy header!</h2>



// ///////////////////////////////////////////////////////////////////////

// Tools for making http requests

// ///////////////////////////////////////////////////////////////////////

// ------------------------------
// 1. netcat (a HTTP client)
// A commandline utility for connection and communication through TCP or UDP.
// It can take a host and port as arguments.
// you have to manually type the http request since it doesn't understand http (?)

// Sample:
// nc cs.nyu.edu 80 (arguments: host, port)
// GET / HTTP/1.1 (request line)
// Host: cs.nyu.edu (header)

// Or:
// nc cs.nyu.edu 80 (arguments: host, port)
// GET /home/index.html HTTP/1.1 (request line) (path in the midddle)
// Host: cs.nyu.edu (header)


// ------------------------------
// 2. curl
// a command line tool to transfer data to and from a server
// simply supply the url
// the -I (uppercase I) flag retrieves headers only
// the -i (lowercase i) flag retrieves headers and body

// Sample:
// curl -I www.google.com

// -----
// Curl for POST request:
// (?)

// ------------------------------
// 3. browser (Chrome)
// inspect -> network 
// (you can see the request and response messages)

// We will use net module to create a web server





// ///////////////////////////////////////////////////////////////////////

// Appendix

// ///////////////////////////////////////////////////////////////////////

// ------------------------------
// HTTP mathods
// - GET: retrieve a resource
// - POST: send data to a server to create a resource
// - PUT: send data to a server to update a resource
// - DELETE: send data to a server to delete a resource
// - HEAD: retrieve the headers of a resource
// - OPTIONS: retrieve the methods that a server supports
// - PATCH: send data to a server to partially update a resource
// - TRACE: echo the request back to the client
// - CONNECT: convert the request connection to a transparent TCP/IP tunnel
// - ...

