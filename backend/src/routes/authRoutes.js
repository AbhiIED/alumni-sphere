const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/reset-password", authController.resetPassword);

router.get("/admin-dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
