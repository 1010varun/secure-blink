const express = require('express');
const router = express.Router();
const { register, login, resetPassword, restricted} = require("../controllers/userController");
const {authenticateToken} = require("../middleware/authenticateToken");
const {authorize} = require("../middleware/authorize")


router.post("/register", register);
router.post("/login", login);
router.post("/resetPassword", resetPassword);
router.get("/role", authenticateToken, authorize, restricted);

module.exports = router;