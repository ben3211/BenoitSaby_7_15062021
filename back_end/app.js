const express = require('express');
const cors = require('cors')
const app = express();

// Router importation 
const userRoute = require('./routes/user');

//db
const db = require ('./config/db');
/* const db = require('./models/index'); */  // sequelize

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/', userRoute);

// App exportation
module.exports = app;