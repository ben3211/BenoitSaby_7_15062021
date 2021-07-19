const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.getAllPosts = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const moderator = decodedToken.moderator;
  if (isAdmin == 1) {
   let sql = `SELECT post.id, post.fk_userId, post.content,
   DATE_FORMAT(DATE(post.createdAt), '%d/%m/%Y') AS date, TIME(post.createdAt) AS time,
   user.username
   FROM post JOIN user
   ON post.fk_userId = user.id
   WHERE post.id = ?
   ORDER BY post.createdAt DESC`;
   const postId = req.params.id;
   db.query(sql, [postId], (err, result) => {
     if (err) throw err;
     console.log(result);
     return res.status(200).json(result);
   });
  }    else {
   res.status(401).json({error: 'No authorization'})
}
};

exports.getComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const moderator = decodedToken.moderator;
  if (isAdmin == 1) {
   let sql = `SELECT comment.content, DATE_FORMAT(DATE(comment.createdAt), '%d/%m/%Y') AS date, TIME(comment.createdAt) AS time, comment.id,
   comment.fk_userId, user.username
   FROM comment 
   JOIN user ON comment.fk_userId = user.id 
   WHERE fk_postId = ? 
   ORDER BY comment.createdAt DESC`;
   db.query(sql, (err, result) => {
      if (err) throw(err);
      console.log(err);
      console.log(result);
      return res.status(200).json(result);
   });
  }    else {
   res.status(401).json({error: 'No authorization'})
}
};

exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const moderator = decodedToken.moderator;
  if (isAdmin == 1) {
   let postId = req.params.id;
   let sql = "DELETE FROM post WHERE fk_userId = ?";
   db.query(sql, [postId], (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("Post deleted");
      // changed line
      return res.status(200).json(result);
    });
  }    else {
   res.status(401).json({error: 'No authorization'})
}
};

exports.deleteComment = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const moderator = decodedToken.moderator;
  if (isAdmin == 1) {
   let commentId = req.params.id;
   let sql = "DELETE FROM comment WHERE fk_userId = ?";
   db.query(sql, [commentId], (err, result) => {
      if (err) throw err;
      console.log(result);
      console.log("Post deleted");
      // changed line
      return res.status(200).json(result);
    });
  }    else {
   res.status(401).json({error: 'No authorization'})
}
};
