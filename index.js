const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const rutasUsuario = require('./routes/usuario.routes');
app.use('/usuario', rutasUsuario);

const rutasProyecto = require('./routes/proyecto.routes');
app.use('/proyecto', rutasProyecto);


const server = http.createServer( (request, response) => {    
    console.log(request.url);
});

app.listen(3000);