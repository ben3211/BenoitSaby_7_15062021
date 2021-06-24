const express = require ('express');
const router = express.Router ();
const postCtrl = require ('../controllers/post');


router.post('/add', postCtrl.createPost);
router.get('/posts', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', postCtrl.LikePost);

router.post('/comment/:id', postCtrl.addComment);
router.delete('/comment/:id', postCtrl.deleteComment);

// Router exportation
module.exports = router;