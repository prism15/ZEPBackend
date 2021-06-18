const express = require('express')
const router = express.Router()
const admin = require('../models/registerModel');   
const Register = require('../controllers/registerController')


router.post('/', Register.register);


module.exports = router;