const mysql = require('mysql2');
const db = require ('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup = (req, res, next) => {
   const { username, email, password, imageUrl, isAdmin, createdAt, updateAt } = req.body;
   // Check email
   db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {
      if(error) {
         console.log(error);
      }
      if(results.length > 0) {
         return res.status(401).json({ error: 'That email is already in use' });
      }
      // Bcrypt
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPassword);
      //Database
      db.query('INSERT INTO user SET ?', 
      {username: username, email: email, password: hashedPassword }, (error, results) => {
         if(error) {
            console.log(error);
         } else {
            console.log(results);
            return res.status(201).json({ error: 'Profile created' });
         }
      })
   });
};

   /* let sql = "INSERT INTO user (username, email, password) VALUES ('Test', 'test@test.com', 'test')"
   db.query(sql, function (err, result) {
      if (err) throw err;
      console.log (result)
      res.send('row created')
   });
}; */

exports.login = (req, res, next) => {
   try {
      const { email, password } = req.body;

      if ( !email || !password) {
         return res.status(201).json({ error: 'Profile created' });
         /* return res.status(400).render('login', {
            message: 'Please provide an email and password'
         }) */
      }

      db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
         if( !results || !(await bcrypt.compare(password, results[0].password)))
         res.status(401).render('login', {
            message: 'Email or password is incorrect'
         })
         else {
            const id = results[0].id;
            const token = jwt.sign(
               { id: id }, 
               process.env.JWT_SECRET,
               { expiresIn: process.env.JWT_EXPIRES } 
            ) 
            console.log(token)
         }
      });
   } catch (error) {
      console.log(error);
   }
};

exports.getAllProfiles = (req, res, next) => {

};

exports.getOneProfile = (req, res, next) => {

};

exports.updateProfile = (req, res, next) => {
   
};

exports.deleteProfile = (req, res, next) => {
   
};