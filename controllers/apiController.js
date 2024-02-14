const User = require('../models/userModel');

const protected = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data');
      }
};

module.exports = {protected};