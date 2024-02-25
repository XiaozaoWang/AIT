// simplist ver

import express from 'express';
const app = express();

// use a router to bind a callback, a request handler
// to a particular url
// (all built-in)
app.get('/', function(req, res){
	res.send('hello world');
});

app.listen(3000);
console.log('Started server on port 3000');
