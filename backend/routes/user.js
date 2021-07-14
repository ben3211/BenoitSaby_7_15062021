const express = require ('express');
const router = express.Router ();
const auth = require ('../middleware/auth')
const userCtrl = require ('../controllers/user');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.post('/home/logout', userCtrl.logout);

// Profile
router.get('/home/profiles', auth, userCtrl.getAllProfiles);
router.get('/profile/:id', auth, userCtrl.getOneProfile);
router.put('/profile/:id', auth, userCtrl.updateProfile);
router.delete('/profile/:id', auth, userCtrl.deleteProfile);

// Router exportation
module.exports = router; 