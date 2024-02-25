
// Last 2 classes review
// ()

// express
// features:
// * same as above, but also:
// * request and response object are more sophisticated
//     * req
//         * ip
//         * query
//         * (through middleware), session, cookie, body, etc.
//     * res
//         * u have methods we built (send, sendFile, render)
//         * json()
//         * redirect()
// * nicer path handling
//     * normalizes paths
//     * (eg trailing forward slash, casing, etc.)
// * middleware - functions that get called before and / or after your route handler
// * pre-built middleware
// * defaults present (but can be customized) for
//     * error pages (404)




// express has methods on the app object that match HTTP method names.
// It's possible to use the same route for different HTTP methods. 
// e.g. app.get('/', ...) and app.post('/', ...)
// there should only be one response sent back.


// Templating
// * html file with placeholders as a template
// * a context object that maps placeholder names (variables) to actual values
// * a way to render so that an actual html doc is produced
// * send back result as http response body

// common templating featrues:
// variables, basic control structures (loops, conditionals), ...

// express template engines:
// pug/jade: html, (default with express)
// we will be using hbs (handel bars)

// handlebars:
// * all template go within views folder
// * there must be one template called layout.hbs (shared among other templates)
// e.g.
// res.render(nameOfTemplate, context)
// context {varName: val}

// forms:
// two import attributes:
// * method - the http request method of the request that we're about to make
// * action - path of request
//     * if left blank, path is path that form is on
// The name attribute is sent to the server... in a GET request name attribute show up in query string, 
// in POST request, shows up in body



// middleware function:
// * req, res, next as args
// * called before or after route handlers
// * [register with app.use]
// * called in order that they are "registered"
// * middleware should either return a response or call next
//     * next calls next middleware or next routehandler
// common use cases:
// * calling a function (like logging) before every route handler
// * add props to our request and response object
// * intercept an incoming request an pre-emptively send back response


// POST request

// POST /cats HTTP/1.1
// Content-Type: x-www-form-urlencoded
// Content-Length: ...

// name=mochi&lives=8

import express from 'express';

const app = express(); // think of express as a function that returns an app object

const catsDB = [
    {name: 'Fluffy', lives: 5},
    {name: 'Whiskers', lives: 9},
    {name: 'Paws', lives: 3}
];

// !!!!!!!
app.set('view engine', 'hbs'); // set the view engine to hbs

// middleware
// the order in which they are included is important!!
// try including the second middleware first,
// or put the middleware after the route handler

app.use(express.urlencoded({extended: true})) // this only handle name=value&...
// app.use(express.json())
// add a new prop, req.body
// parsed http request body 

app.use((req, res, next) => {
    console.log(req.method, req.path, req.url, req.query, req.params, req.body)
    next()
  })

// ?
app.use(express.static('./public')); // serve static files from public folder

app.use((req, res, next) => {
    console.log('I recieved a request!'); // will happen every time a request is made
    next()
})



app.get('/', (req, res) => {
    res.send('Hello World');
}); // add a new route

app.get('/cat', (req, res) => {
    res.send('here is a cat');
}); // add a new route


app.post('/cats', (req, res) => {
    const newCat = {name: req.body.name, lives: req.body.lives}
    catsDB.push(newCat)
    res.redirect('/cats')
    //res.render('cats', {cats: catsDB})
})

app.get('/cats', (req, res) => {
    // console.log(req.method, req.path, req.url, req.query, req.params);
    // just rendering: GET /cats /cats {} {}


    // filtering through search
    let data = catsDB
    // ??? case sensitive???
    // if not hasOwn, then won't go into this if statement
    if (Object.hasOwn(req.query, 'minlives')) {
        data = data.filter(cat => cat.lives >= parseInt(req.query.minlives));
    }
    console.log(data);
    // res.render('cats_handlebar', {myCats: catsDB});
    res.render('cats_forms', {myCats: data});
})



app.get('/goelsewhere', (req, res) => {
    res.redirect('/');
});




//10:34 (example)
//10:36 - hbs
//10:36? 08.mjs
// server gets results, render 
// final version in class code!!!
// last line: prevent resubmission (prg pattern: post-redirect-get)
// adding scripts tag, and render as html
// 10:43 cats.hbs (triple curly braces: no escaping(?))

// lastly, serve css
// 10:48 (?)

console.log('Starting')
app.listen(3000);
console.log('Server is listening on port 3000'); 






// making a request through a browser:
// 1. GET, POST, submit forms, redirect, URL bar, clicking on a link
// forms??
// ()