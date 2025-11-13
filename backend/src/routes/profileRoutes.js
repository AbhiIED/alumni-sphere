const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const profileController = require("../controllers/profileController");
const { verifyToken } = require("../middleware/authMiddleware"); // ✅ FIXED

// ✅ Create upload directory if missing
const uploadDir = path.join(__dirname, "../uploads/profile_pics");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Configure Multer for profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Routes
router.get("/profile", verifyToken, profileController.getUserProfile);
router.put("/update-settings", verifyToken, profileController.updateUserSettings);
router.put("/change-password", verifyToken, profileController.changePassword);
router.post(
  "/upload-pic",
  verifyToken,
  upload.single("profilePic"),
  profileController.uploadProfilePic
);

module.exports = router;
