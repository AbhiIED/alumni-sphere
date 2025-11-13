const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyAdmin } = require("../middleware/authMiddleware");

// ✅ Signup & Signin Routes
router.post("/signin", authController.signin);
router.post("/signup", authController.signup);

// ✅ Example Protected Admin Route
router.get("/admin-dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
