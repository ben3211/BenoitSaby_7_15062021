const express = require('express');
const cors = require('cors')
const app = express();

// Router importation 
const userRoute = require('./routes/user');


//db
const db = require('./models/index');


/* db.authenticate()
   .then(() => console.log('aaaaaaaaaa'))
   .catch(err => console.log('error:' + err)) */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// router
app.use('/user', userRoute);

// App exportation
module.exports = app;