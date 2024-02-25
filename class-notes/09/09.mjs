import express from 'express';
const app = express();
const complaints = [];

app.set('view engine', 'hbs');

// foo=bar&baz=qux
// places the parsed data in req.body
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log(req.method, req.path, req.url, req.query, req.params, req.body)
    next()
})

app.get('/complaints/add', (req, res) => {
    res.render('complaintForm', {})
});

app.get('/complaints', (req, res) => {
    // 10:04 filter
    let filteredComplaints = complaints;
    // if (Object)
    res.render('complaints', {filteredComplaints}) //
});

app.post('/complaints/add', (req, res) => {
    // 10:11 09.mjs, hbs. Rerender or redirect, error handling
    res.send('Complaint received');
    // extract
    const {line, complaintText} = req.body;
    let boxes = req.body.box;
    if (!Array.isArray(boxes)) {
        boxes = [boxes];
    }
    complaints.push({line, complaintText, boxes: boxes.join(', ')})
    console.log(complaints);
    res.redirect('/complaints');
});

// 10:14
// remember the clients that has visited us
// ()
// How can we do this?
// in header: custom header, cookie, sessionid
// Not recommended: path/body

// session management
// - keep data on the server about a client
// - based on unique id for that client

// 1. New client visits site
// 2. Server sees that no session is sent
// ()

// Cookies
// They are not exactly the same as sessions, but can be used for session management
// Used to store a little bit of data on the client (other ways: localstorage)

// ---
// HTTP req:
// one header for sending cookies to server

// ()

app.get('/setcookie', (req, res) => {
});

app.listen(3000);