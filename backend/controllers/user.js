const mysql = require("mysql2");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Db connexion
const bcrypt = require("bcrypt");

/****************************************** Signup ***************************************/
exports.signup = (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let validityPassword = req.body.validityPassword;
  let error = [];

  db.query(
    "SELECT email FROM user WHERE email = ?",
    [email],
    (error, results) => {
      if (results.length > 0) {
        return res.status(401).json({ error: "That email is already in use" });
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            let sql =
              "INSERT INTO user VALUES(NULL, ?, ?, ?, null, null, null, null)";
            db.query(sql, [username, email, hash], (error, results) => {
              if (error) {
                return res.status(400).json({ error: "Request error" });
              }
              res.status(201).json({ message: "New user !" });
            });
          })
          .catch((error) => res.status(500).json({ error: "MySql" }));
      }
    }
  );
};

/****************************************** Login ***************************************/
exports.login = (req, res, next) => {
  const username = req.body.username;
  const insertLogin = [username];
  const queryLogin = "SELECT * FROM user WHERE username = ?";
  db.query(queryLogin, insertLogin, (error, results, fields) => {
    const result = results[0];

    if (!result) {
      return res.status(404).json({
        error: "Username not found",
      });
    }
    const userId = result.id;
    const username = result.username;
    const token = jwt.sign({ userId: result.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    bcrypt
      .compare(req.body.password, result.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({
            error: "Invalide password",
          });
        }

        res.status(200).json({
          id: userId,
          username: username,
          token: token,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: "Error server",
        });
      });
  });
};

/*   let username = req.body.username;
  let password = req.body.password;
  let sqlInserts = [username];
  let sql = "SELECT * From user WHERE username=?";
  sql = mysql.format(sql, sqlInserts);
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      //Si erreur :
      if (err) reject({ err });

      //Si le resultat est vide :
      if (!result) {
        reject({ message: "Username not found" });
      }
      //Sinon :
      else {
        bcrypt.compare(password, result[0].password)
        .then((valid) => {
          if (!valid) return reject({ error: "Invalide password" });
          resolve({
            userId: result[0].id,
            token: jwt.sign({ userId: result[0].id }, 
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
            }),
          });
        });
      }
    });
  })
    .then((response) => res.status(200).json({ response }))
    .catch((error) => res.status(400).json({ error }));
}; */

exports.logout = (req, res, next) => {};

exports.getAllProfiles = (req, res, next) => {};

exports.getOneProfile = (req, res, next) => {};

exports.updateProfile = (req, res, next) => {};

exports.deleteProfile = (req, res, next) => {};
