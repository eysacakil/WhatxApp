const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');  // bcryptjs kütüphanesini import edin
const { loginUser } = require('../controller/auth-controller');


// Kullanıcı girişi
router.post('/login', loginUser);

module.exports = router;
