const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection({
   host     : 'localhost',
   user     : process.env.USER_DB,
   password : process.env.PASSWORD_DB, 
   database : 'groupomania',
   dialect: "mysql",
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
   }
});

db.connect(function(err) {
   if (err) throw err;
   console.log("Connected to db");
});



module.exports = db;