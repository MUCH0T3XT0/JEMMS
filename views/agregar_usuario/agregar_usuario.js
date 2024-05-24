const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const log = console.log;

const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname, 'public')));

const controller = require("../../controllers/usuario.controllers.js");


