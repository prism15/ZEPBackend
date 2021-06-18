const express = require('express');
const bookroom = require('../controllers/bookingController');
const router = express.Router();

router.post("/",bookroom.bookroom);

module.exports = router;