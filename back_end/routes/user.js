const express = require ('express');
const router = express.Router ();
const db = require ('../config/db')
const userCtrl = require ('../controllers/user');


router.get('/', /* userCtrl.signUp */); 


// Router exportation
module.exports = router;