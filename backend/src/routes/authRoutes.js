const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/verify-email", authController.verifyEmail);
router.post("/resend-otp", authController.resendOTP);
router.post("/send-otp", authController.sendOTP);
router.post("/verify-otp", authController.verifyOTP);
router.post("/reset-password", authController.resetPassword);

router.get("/admin-dashboard", verifyAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!", user: req.user });
});

module.exports = router;
