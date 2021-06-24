const express = require('express');
const cors = require('cors')
const app = express();
const path = require('path')

// Environment variables
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// Router importation 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

//Database
const db = require ('./config/db');
/* const db = require('./models/index'); */  // sequelize

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/', userRoutes);
app.use('/', postRoutes);


// App exportation
module.exports = app;