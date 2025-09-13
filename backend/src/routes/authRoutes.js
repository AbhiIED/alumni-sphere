const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


// Signin route
router.post("/signin", authController.signin);

// Signup route (optional, for registering users)
//router.post("/signup", signup);

module.exports = router;
