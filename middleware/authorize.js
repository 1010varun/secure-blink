const User = require("../models/userModel")

const authorize = async(req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email });

      if (user) {
        req.userRole = user.role;
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error during authorization');
    }
  };
  
module.exports = { authorize };
  