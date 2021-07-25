const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const helmet = require("helmet");
const authLimiter = require ('./middleware/authLimiter')

//Database connexion
const db = require ('./config/db');
/* const db = require('./models/index'); */  // sequelize

const app = express();

// Environment variables
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// Router importation 
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const moderatorRoutes = require ('./routes/moderator');

app.use(express.json());

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret for managing Session',
	resave: true,
	saveUninitialized: true
}));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Helmet
app.use(helmet());

// Define routes
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/modo', moderatorRoutes);


// App exportation
module.exports = app;