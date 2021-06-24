const express = require ('express');
const router = express.Router ();
const userCtrl = require ('../controllers/user');

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);

router.get('/profiles', userCtrl.getAllProfiles);
router.get('/profile/:id', userCtrl.getOneProfile);
router.put('/profile/:id', userCtrl.updateProfile);
router.delete('/profile/:id', userCtrl.deleteProfile);

// Router exportation
module.exports = router; 