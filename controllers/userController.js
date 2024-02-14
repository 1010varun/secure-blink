const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async(req, res) => {
  const { email, password, role } = req.body;
  
  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
};

const login = async(req, res) => {
  const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error during login');
    }
};

const resetPassword = async(req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (user && await bcrypt.compare(oldPassword, user.password)) {
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;
        await user.save();
        res.status(200).send('Password reset successfully');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error during password reset');
    }
};

const restricted = async(req, res) => {
  try {
    res.json({ role: req.userRole });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching user role');
  }
};

module.exports = {register, login, resetPassword, restricted};