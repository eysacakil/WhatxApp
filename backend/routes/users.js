const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Kullanıcı kaydı
router.post('/register', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const newUser = new User({ firstName, lastName, username, email, password });
    await newUser.save();
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
