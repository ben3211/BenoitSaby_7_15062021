const mysql = require('mysql2');

const db = mysql.createConnection({
   host     : 'localhost',
   user     : 'root',
   password : 'GHRr4Q2c', 
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