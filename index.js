const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response, next) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send("Hola Mundo");
    response.end(); 
});

app.get("/home",(request,response,next)=>{
    response.render("home/home");
});

//const rutasHome = require('./routes/home.routes');
//app.use('/home', rutasHome);

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);