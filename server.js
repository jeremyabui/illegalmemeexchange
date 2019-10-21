//-------------------------SETUP------------------------------
const express = require('express');
const bodyParser = require('body-parser');
//internal modules
const db = require('./models');
const routes = require('./routes');
//instanced module
const app = express();

//------------------------MIDDLEWARE---------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'))

//------------------------CONFIGURATION VARIABLES--------------

const PORT = process.env.PORT || 3000;

//------------------------ROUTES-------------------------------

//SECTION View Routes

// app.use('/', routes.views);

//------------------------START SERVER-------------------------

