const express = require ('express');
const router = express.Router ();
const auth = require ('../middleware/auth')
const userCtrl = require ('../controllers/moderator');

router.get('/posts', auth, moderatorCtrl.getAllPosts);
router.get('/comment/:id', auth, moderatorCtrl.getComment);
router.delete('/:id', auth, moderatorCtrl.deletePost);
router.delete('/comment/:id', auth, moderatorCtrl.deleteComment);
