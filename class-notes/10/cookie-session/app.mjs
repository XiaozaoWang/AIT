
import express from "express";

// npm install express-session
import session from "express-session"; 
// gives you a req.session object that is blank



const app = express();
app.set('view engine', 'hbs');

// must appear before you access req.body
// parses name=val into req.body
app.use(express.urlencoded({extended: false}));

const sessionOptions = {
    secret: "secret for signing session id", // try commenting out! it won't work!
    saveUninitialized: false,
    resave: false
};
app.use(session(sessionOptions));

app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.name);
    console.log(req.sessionID);
    res.render('form', {name: req.session.name});
});

app.post('/', (req, res) => {
    req.session.name = req.body.name;
    res.redirect('/');
});

app.listen(3000);
console.log("Server is running on port 3000");