const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');  // bcryptjs kütüphanesini import edin

// Kullanıcı girişi
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {  // Şifre kontrolü
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
