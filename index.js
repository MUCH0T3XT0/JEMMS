const http    = require('http');
const express = require('express');
const path    = require('path');
const fs      = require('fs');
const app     = express();

const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host:"127.0.0.1",
    user:"mikey",
    password:"mikey",
    database: "APPIX",
    connectionLimit:5
});

app.get('/test_db', async(request, response, next) => {
    let conn;

    try{
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM USUARIO")
        console.log(rows);
        const jsonS = JSON.stringify(rows);
        response.writeHead(200, {'Content-type':'text/html'});
        response.end(jsonS);
    }catch(e){
        console.log(e)
    }
});

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

app.get("/login",(request,response,next)=>{
    response.render("login/login");
});

app.get("/home",(request,response,next)=>{
    response.render("home/home");
});

app.get("/nuevo_proyecto",(request,response,next)=>{
    response.render("home/nuevo_proyecto");
});

app.get("/menu_proyecto",(request,response,next)=>{
    response.render("proyecto/menu_proyecto");
});

app.get("/info_proyecto",(request,response,next)=>{
    response.render("proyecto/info_proyecto");
});

app.get("/reporte",(request,response,next)=>{
    response.render("proyecto/reporte");
});

app.get("/reporte-riesgo", (request,response,next)=>{
    response.render("proyecto/reporte-riesgo");
});


//const rutasHome = require('./routes/home.routes');
//app.use('/home', rutasHome);

const server = http.createServer( (request, response) => {    
    console.log(request.url);
});
app.listen(3000);