const express = require("express");
const router = express.Router();
const {protected}  = require('../controllers/apiController')
const {authenticateToken} = require("../middleware/authenticateToken")

router.get("/protected", authenticateToken, protected);

module.exports = router

