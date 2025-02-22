const express = require('express');
const app = express();
const path = require('path');
const PORT = 3700;

// Parser for the form or hanlde form data, not body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//setup static for our =>  assets (img, videos), css, js
app.use(express.static(path.join(__dirname, 'public')));

//ejs setup and render ejs pages for our fronted 
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/profile/:username', (req, res) => {
    res.send(`Welcome: ${req.params.username}`)
})
app.get('/author/:username/:age', (req, res) => {
    res.send(`Welcome: ${req.params.username} of age: ${req.params.age}`)
})

app.listen(PORT, () => {
    console.log(`server running: http://localhost:${PORT}`);
})