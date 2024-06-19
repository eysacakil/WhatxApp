require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create tokens
    const accessToken = jwt.sign(
      { email: user.email, username: user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' } // Access token expiration time
    );

    const refreshToken = jwt.sign(
      { email: user.email, username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' } // Refresh token expiration time
    );

    // Exclude password and _id from the user object
    const userObject = user.toObject();
    const { password: userPassword, _id:userId, ...userInfo } = userObject;

    res.json({
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: {
        ...userInfo,
         userId
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { loginUser };
