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

const updateUser = async (req, res) => {
  const {  profilePicture } = req.body;
  const {userId}=req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.profilePicture = profilePicture
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { registerUser,getAllUsers,updateUser };