const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const [users] = await db.query(`
      SELECT 
        u.User_ID, 
        u.User_Fname, 
        u.User_Lname, 
        u.Email_ID, 
        u.Gender, 
        u.Phone_no, 
        u.Address,
        ut.User_Type_name AS User_Type
      FROM User_Table u
      JOIN User_Type_Table ut ON u.User_Type_ID = ut.User_Type_ID
      ORDER BY u.User_ID ASC
    `);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/add-admin", verifyAdmin, async (req, res) => {
  try {
    const { fname, lname, gender, phone, email, password, address, role } = req.body;

    if (!fname || !lname || !gender || !phone || !email || !password || !address)
      return res.status(400).json({ error: "All fields are required" });

    const hashed = await bcrypt.hash(password, 10);

    const [userResult] = await db.query(
      `INSERT INTO User_Table (User_Type_ID, User_Fname, User_Lname, Gender, Phone_no, Email_ID, Password, Address)
       VALUES (3, ?, ?, ?, ?, ?, ?, ?)`,
      [fname, lname, gender, phone, email, hashed, address]
    );

    await db.query(
      `INSERT INTO Admin_Table (Admin_ID, User_ID, Role)
       VALUES (?, ?, ?)`,
      [userResult.insertId, userResult.insertId, role || "Administrator"]
    );

    res.status(201).json({ message: "Admin added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error adding admin" });
  }
});

// Get user by ID
router.get("/:id", verifyAdmin, async (req, res) => {
  try {
    const [user] = await db.query(
      `SELECT 
        u.User_ID, u.User_Fname, u.User_Lname, u.Email_ID, u.Phone_no, 
        u.Gender, u.Address, ut.User_Type_name AS User_Type
       FROM User_Table u
       JOIN User_Type_Table ut ON u.User_Type_ID = ut.User_Type_ID
       WHERE u.User_ID = ?`,
      [req.params.id]
    );

    if (!user.length) return res.status(404).json({ error: "User not found" });

    res.json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching user details" });
  }
});

// Delete user
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;

    // Get Alumni_ID if exists (needed to delete dependent records)
    const [alumni] = await db.query("SELECT Alumni_ID FROM Alumni_Table WHERE User_ID = ?", [id]);
    if (alumni.length > 0) {
      const alumniId = alumni[0].Alumni_ID;
      // Delete dependent records that reference Alumni_ID
      await db.query("DELETE FROM Donation WHERE Donor_ID = ?", [alumniId]);
    }

    // Now safe to delete from type tables
    await db.query("DELETE FROM Admin_Table WHERE User_ID = ?", [id]);
    await db.query("DELETE FROM Student_Table WHERE User_ID = ?", [id]);
    await db.query("DELETE FROM Alumni_Table WHERE User_ID = ?", [id]);
    await db.query("DELETE FROM User_Table WHERE User_ID = ?", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
