const mysql = require("mysql2");
const db = require("../config/db");
const jwt = require("jsonwebtoken");

// Db connexion
const bcrypt = require("bcrypt");

/****************************************** Signup ***************************************/
exports.signup = (req, res, next) => {
  const { username, email, password, imageUrl, isAdmin, createdAt, updateAt } =
    req.body;
  // Check email
  db.query(
    "SELECT email FROM user WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.status(401).json({ error: "That email is already in use" });
      }
      // Bcrypt
      let hashedPassword = await bcrypt.hash(req.body.password, 10);
      //Database
      db.query(
        "INSERT INTO user SET ?",
        { username: username, email: email, password: hashedPassword },
        (error, results) => {
          if (error) {
            console.log(error);
          } else {
            console.log(results);
            return res.status(201).json({ error: "Profile created" });
          }
        }
      );
    }
  );
};

/****************************************** Login ***************************************/
exports.login = (req, res, next) => {
  const username = req.body.username;
  const insertLogin = [username];
  const queryLogin = "SELECT * FROM user WHERE username = ?";
  db.query(queryLogin, insertLogin, (error, rows, fields) => {
    const result = rows[0];

    if (!result) {
      return res.status(404).json({
        error: "Username not found",
      });
    }
    const id = result.id;
    const username = result.username;
    const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
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
          id: id,
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
