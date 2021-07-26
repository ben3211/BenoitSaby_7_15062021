const mysql = require("mysql2");
const db = require("../config/db");
const jwt = require("jsonwebtoken");
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
              "INSERT INTO user VALUES(NULL, ?, ?, ?, null, 0, null, null)";
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
    const isAdmin = result.isAdmin;
    const token = jwt.sign(
      { userId: result.id, isAdmin: result.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );
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
          isAdmin: isAdmin,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: "Error server",
        });
      });
  });
};

exports.updateProfile = (req, res, next) => {
  if (req.body.username == "" || req.body.email == "") {
    return res.status(404).json({ error: "Fields are empty" });
  }
  if (!regexEmail.test(req.body.email)) {
    return res.status(403).json({ error: "Email adress invalid" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const id = decodedToken.userId;
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

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
            "UPDATE user SET username = ?, email = ?, password = ? WHERE id = ?";
          db.query(sql, [username, email, hash, id], (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log("Profile update");
            return res.status(200).json(result); 
          });
        });
      }
    }
  );
};

exports.deleteProfile = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;
  let sql = "DELETE FROM user WHERE id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("Profile deleted");
    return res.status(200).json(result);
  });
};

exports.getOneProfile = (req, res, next) => {};

exports.getAllProfiles = (req, res, next) => {};

// Regex
const regexEmail =
  /[A-Za-z0-9_'~-]+(?:\.[A-Za-z0-9_'~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[a-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/;
