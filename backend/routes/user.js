const express = require ('express');
const router = express.Router ();
const auth = require ('../middleware/auth')
const userCtrl = require ('../controllers/user');
// Security
const passwordValidator = require ('../middleware/passwordValidator');
const emailValidator = require ('../middleware/emailValidator');
const authLimiter = require ('../middleware/authLimiter');

router.post('/signup', emailValidator, passwordValidator, userCtrl.signup); 
router.post('/login', authLimiter, userCtrl.login);

// Profile
router.get('/home/profiles', auth, userCtrl.getAllProfiles);
router.get('/profile/:id', auth, userCtrl.getOneProfile);
router.put('/profile/:id', auth, userCtrl.updateProfile);
router.delete('/profile/:id', auth, userCtrl.deleteProfile);

// Router exportation
module.exports = router; 