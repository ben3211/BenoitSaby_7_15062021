const mysql = require('mysql2');
const db = require ('../config/db');

/********************************* Posts **********************************/
exports.createPost = (req, res, next) => {

};

exports.getAllPosts = (req, res, next) => {
   let sql = 'SELECT * FROM post';
   db.query(sql, (err, results) => {
      if(err) throw (err);
      console.log(results);
      res.send('Posts fetched..');
   })
};

exports.getOnePost = (req, res, next) => {
   let sql = `Update * FROM post WHERE id = ${req.params.id}`;
   db.query(sql, (err, result) => {
      if(err) throw (err);
      console.log(result);
      res.send('Post fetched..');
   })
};

exports.updatePost = (req, res, next) => {
   let sql = `Update post 
            SET title = ${req.body.title}
            content = ${req.body.content}
            WHERE id = ${req.params.id}`;
   db.query(sql, (err, result) => {
      if(err) throw (err);
      console.log(result);
      res.send('Post update..');
   })
};

exports.deletePost = (req, res, next) => {

};

exports.LikePost = (req, res, next) => {

};

/******************************** Comments *********************************/
exports.addComment = (req, res, next) => {

};

exports.deleteComment = (req, res, next) => {

};