
// 1. 
// (true/false) If a request causes your web server to crash immediately without any exception handling 
// (for example, a request somehow causes a TypeError to be thrown in your net module based web server, 
// consequently crashing your entire application), the browser will automatically receive a 500 Internal Server Error as a response.


// Ans: 
// False. If a request causes a web server to crash immediately without any exception handling, the browser will not automatically receive a 500 Internal Server Error as a response.
// In such a scenario, the server is unable to generate any response because it has crashed, 
// so the browser will typically display an error message indicating that it was unable to connect to the server or that the webpage is not available. 
// The 500 Internal Server Error is an HTTP status code that is typically returned when the server encounters an error while processing a request, 
// but the server needs to be operational in order to generate and send this response.


// 2.
// What separates the body from the rest of the headers in an http request? 
// You can assume carriage return and line feed as a new line (although HTTP/1.1 specifies that line feed is adequate).

// Ans:
// two carriage return and line feeds: \r\n\r\n


// 3.
// If a user types in a url to an html document that contains a <link> tag referencing a css file and an <img> tag referencing an image, 
// the browser will minimally make [?] total requests to render the entire page 
// (assuming that the serve cannot push resources to the client without request asking for it).

// Ans:
// 3 (one for the html, one for the css, and one for the image)


// 4.
// The callback function passed to the net module's createServer method is only called when:
// before the server starts
// once the server starts
// when a client connects
// when the server receives data from the client
// when the server shuts down

// Ans:
// when a client connects!