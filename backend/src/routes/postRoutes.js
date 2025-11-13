const express = require("express");
const router = express.Router();
const db = require("../config/db");
const { verifyToken } = require("../middleware/authMiddleware"); // ✅ FIXED

// ✅ Fetch All Posts
router.get("/", verifyToken, async (req, res) => {
  try {
    const [posts] = await db.query(`
      SELECT 
        p.Post_ID,
        p.Content,
        p.Image_URL,
        p.Created_At,
        p.Likes_Count,
        p.Comment_Count,
        a.Alumni_ID,
        u.User_ID,
        u.User_Fname,
        u.User_Lname,
        u.Profile_Pic AS User_Image,
        a.Graduation_Year,
        a.Course,
        a.Department
      FROM Post p
      JOIN Alumni_Table a ON p.Alumni_ID = a.Alumni_ID
      JOIN User_Table u ON a.User_ID = u.User_ID
      ORDER BY p.Created_At DESC
    `);

    res.json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get Comments for a Post
router.get("/:postId/comments", verifyToken, async (req, res) => {
  const { postId } = req.params;

  try {
    const [comments] = await db.query(
      `
      SELECT 
        c.Comment_ID,
        c.Comment,
        c.Comment_Date,
        u.User_Fname,
        u.User_Lname,
        u.Profile_Pic AS User_Image
      FROM Post_Comment c
      JOIN User_Table u ON c.User_ID = u.User_ID
      WHERE c.Post_ID = ?
      ORDER BY c.Comment_Date ASC
      `,
      [postId]
    );

    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Add a Comment
router.post("/:postId/comments", verifyToken, async (req, res) => {
  const { postId } = req.params;
  const { commentText } = req.body;
  const userId = req.user.id;

  if (!commentText || !commentText.trim()) {
    return res.status(400).json({ success: false, message: "Comment cannot be empty" });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO Post_Comment (Post_ID, User_ID, Comment, Comment_Date)
       VALUES (?, ?, ?, NOW())`,
      [postId, userId, commentText]
    );

    await db.query(
      `UPDATE Post SET Comment_Count = Comment_Count + 1 WHERE Post_ID = ?`,
      [postId]
    );

    const [userRows] = await db.query(
      `SELECT User_Fname, User_Lname, Profile_Pic FROM User_Table WHERE User_ID = ?`,
      [userId]
    );

    const user = userRows[0];

    res.json({
      success: true,
      comment: {
        Comment_ID: result.insertId,
        Post_ID: postId,
        User_ID: userId,
        Comment: commentText,
        Comment_Date: new Date(),
        User_Fname: user.User_Fname,
        User_Lname: user.User_Lname,
        User_Image: user.Profile_Pic || null,
      },
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Like a Post
router.post("/:postId/like", verifyToken, async (req, res) => {
  const { postId } = req.params;

  try {
    await db.query(
      `UPDATE Post SET Likes_Count = Likes_Count + 1 WHERE Post_ID = ?`,
      [postId]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Delete a Post
router.delete("/:postId", verifyToken, async (req, res) => {
  const { postId } = req.params;

  try {
    // Delete comments first (FK constraint)
    await db.query("DELETE FROM Post_Comment WHERE Post_ID = ?", [postId]);

    // Then delete the post
    const [result] = await db.query("DELETE FROM Post WHERE Post_ID = ?", [postId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ success: false, message: "Failed to delete post" });
  }
});


module.exports = router;
