const express = require ('express');
const router = express.Router ();
const postCtrl = require ('../controllers/post');
const auth = require ('../middleware/auth')


router.post('/add', auth, postCtrl.createPost);
router.get('/posts', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.put('/:id', auth, postCtrl.updatePost);
router.delete('/:id', auth, postCtrl.deletePost);
router.post('/:id/like', auth, postCtrl.LikePost);

router.post('/comment/:id', auth, postCtrl.addComment);
router.delete('/comment/:id', auth, postCtrl.deleteComment);

// Router exportation
module.exports = router;