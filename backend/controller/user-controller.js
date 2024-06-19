const User = require('../models/User');
const bcrypt = require('bcryptjs');
 const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ firstName, lastName, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllUsers=async (req, res) => {
    try {
        const users = await User.find();
       return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { registerUser,getAllUsers };