const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

/********************************* Posts **********************************/
exports.createPost = (req, res, next) => {
  const userId = req.body.fk_userId;
  const content = req.body.content;
  let sql = "INSERT INTO post VALUES(NULL, NULL, ?, NULL, NOW(), NOW(), ?)";
  db.query(sql, [content, userId]),
    (err, results) => {
      if (err) {
        throw err;
      } else {
        console.log(results);
        res.send("Post created");
      }
    };
};

exports.getAllPosts = (req, res, next) => {
  let sql = `SELECT post.id, post.fk_userId, post.content,
  DATE_FORMAT(DATE(post.createdAt), '%d/%m/%Y') AS date, TIME(post.createdAt) AS time,
  user.username
  FROM post JOIN user
  ON post.fk_userId = user.id`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    /* console.log(results); */
    return res.status(200).json(results);
  });
};

exports.getOnePost = (req, res, next) => {
  let sql = `SELECT * FROM post WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched..");
  });
};

exports.updatePost = (req, res, next) => {
  let sql = `Update post 
            SET title = ${req.body.title}
            content = ${req.body.content}
            WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post update..");
  });
};

exports.deletePost = (req, res, next) => {};

exports.LikePost = (req, res, next) => {};

/******************************** Comments *********************************/
exports.addComment = (req, res, next) => {};

exports.deleteComment = (req, res, next) => {};
