import express from 'express'
const app = express()

const complaints = [
  // {line: "F", complaintText: "slow", cats: ["delay"]}
]

// this middleware will parse form url encoded bodies
// foo=bar&baz=qux
// places it into req.body
// this function call returns a middleware function
app.use(express.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(req.method, req.path, req.body, req.query)
  next()
})

// use handlebars as our templating
app.set('view engine', 'hbs')

app.get('/complaints/add', (req, res) => {
  res.render('complaintForm', {})
})

app.get('/complaints', (req, res) => {
  let filteredComplaints = complaints
  if(Object.hasOwn(req.query, 'line')) {
    filteredComplaints = complaints.filter(c => c.line === req.query.line)
  }
  console.log('filteredComplaints', filteredComplaints)
  res.render('complaints', {complaints: filteredComplaints})
})

// to add manual error handling / validation
// ensure that the complaintText exists
// validate within route handler for now....
// if there's an error re-render the form instead of redirect
app.post('/complaints/add', (req, res) => {
  // extract the subway line and complaint text from the incoming body
  const {line, complaintText} = req.body

  if(complaintText.length === 0) {
    const error = 'must have complaint text'
    res.render('complaintForm', {error})
  } else {
    // retrieving the categories
    // checkboxes appear as an array if multiple checks
    // if single check, then as value only (not array)
    let cats = req.body.cats
    if(!Array.isArray(cats)) {
      cats = [cats]
    }
    complaints.push({line, complaintText, cats: cats.join(',')})
    console.log(complaints)
    res.redirect('/complaints')
  }
})



app.get('/make-a-cookie', function(req, res) {
    // res.set - set the header or overwrite existing
    // res.append - add multiple of the same header
    // used append so that we can Set-Cookie more than once
    res.append('Set-Cookie', 'MY_SESSION_ID=123; HttpOnly');
    res.append('Set-Cookie', 'color=#00ff00');
    res.send('made you a cookie');
});

app.get('/peek', function(req, res) {
    // uncomment this:
    const s = "alert(document.cookie);";
    res.send('<script>' + s + '</script>' + 'check out yr cookies!');
});

app.listen(3000)
