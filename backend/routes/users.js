const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { registerUser,getAllUsers } = require('../controller/user-controller');

// Kullanıcı kaydı
router.post('/register', registerUser);
router.get('/users', getAllUsers);

module.exports = router;
