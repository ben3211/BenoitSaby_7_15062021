const express = require ('express');
const router = express.Router ();
const postCtrl = require ('../controllers/post');
const auth = require ('../middleware/auth')
const moderatorCtrl = require ('../controllers/moderator');

router.post('/add', auth, postCtrl.createPost);
router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);

router.get('/comment/:id', auth, postCtrl.getComment);
router.post('/comment/:id', auth, postCtrl.addComment);
router.delete('/comment/:id', auth, postCtrl.deleteComment);

router.post('/like/:id', auth, postCtrl.likePost);

/* // Moderator
router.get('/posts', auth, moderatorCtrl.getAllPosts);
router.get('/comment/:id', auth, moderatorCtrl.getComment);
router.delete('/:id', auth, moderatorCtrl.deletePost);
router.delete('/comment/:id', auth, moderatorCtrl.deleteComment); */

// Router exportation
module.exports = router;