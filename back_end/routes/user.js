const express = require ('express');
const router = express.Router ();
const userCtrl = require ('../controllers/user');


router.get('/signup', userCtrl.signup); 

router.get('/',userCtrl.ok);

// Router exportation
module.exports = router;