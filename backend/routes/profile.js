const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Profil güncelleme
router.put('/update', async (req, res) => {
  const { userId, profilePicture } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.profilePicture = profilePicture || user.profilePicture;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
