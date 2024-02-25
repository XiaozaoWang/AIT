import App from './07_classes.mjs';

const app = new App();

app.get('/', (req, res) => {
    res.send('<h1>home</h1>');
});

app.get('/cats', (req, res) => {
    res.sendFile('./cats.html');
});


// render
app.get('/cat', (req, res) => {
    // res.render(pathToTemplate, contextObject)
    res.render('./cat.template', {name:"A", lives:9}); 
    // you can name it cat.html here, won't affect execution
    // But just to make it clear, use .template
})

app.listen(3000, '127.0.0.1');