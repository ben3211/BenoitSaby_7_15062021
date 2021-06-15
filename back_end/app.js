const exrpress = require('express');
const app = exrpress();
const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'GHRr4Q2c',
  database : 'groupomania'
});

/* app.get('/register', (req, res) => {
   db.query (
      "INSERT INTO animal (espece, sexe) VALUE ('chat','M')",
      (err, results) => {
         console.log(err)
         res.send(results);
      }
   );
}); */

// App exportation
module.exports = app;