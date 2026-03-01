const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyAdmin } = require("../middleware/authMiddleware");


router.get("/projects", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.Project_ID AS id,
        p.Project_title AS title,
        p.Project_Description AS description,
        p.Funds_Required AS target,
        p.Fund_Raised AS raised,
        p.Category AS category,
        p.Project_Status AS status,
        p.Image AS image,
        p.Start_Date AS startDate,
        p.End_Date AS endDate,
        p.Created_At
      FROM project p
      ORDER BY p.Project_ID ASC;
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.Donation_ID AS donationId,
        d.Donor_ID AS donorId,
        d.Amount AS amount,
        d.Message AS message,
        d.Donation_Date AS donationDate,
        t.transaction_id AS transactionId,
        t.Payment_Mode AS paymentMode,
        t.Payment_Status AS paymentStatus,
        t.Payment_Time AS paymentTime,
        p.Project_ID AS projectId,
        p.Project_title AS projectTitle,
        p.Category AS category
      FROM donation d
      JOIN project p ON d.Project_ID = p.Project_ID
      JOIN transactions t ON d.transaction_id = t.transaction_id
      ORDER BY d.Donation_Date DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching donations:", err);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});


router.get("/:id/transactions", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(`
      SELECT 
        d.Donation_ID,
        d.Amount,
        d.Donation_Date,
        d.Message,
        t.transaction_id,
        t.Payment_Mode,
        t.Payment_Status,
        t.Payment_Time,
        a.Alumni_ID AS Alumni_Code,
        u.User_Fname AS Donor_Name,
        u.User_Lname AS Donor_LName,
        u.Email_ID AS Donor_Email,
        u.Phone_no AS Donor_Phone
      FROM donation d
      JOIN transactions t ON d.transaction_id = t.transaction_id
      JOIN alumni_table a ON d.Donor_ID = a.Alumni_ID
      JOIN user_table u ON a.User_ID = u.User_ID
      WHERE d.Project_ID = ?
      ORDER BY d.Donation_Date ASC;
    `, [id]);

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching project transactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});


router.post("/projects", verifyAdmin, async (req, res) => {
  try {
    const AdminUserID = req.user.id; // Admin ID from token

    if (!AdminUserID) {
      return res.status(403).json({ error: "Unauthorized: Admin user missing" });
    }

    const {
      Project_title,
      Project_Description,
      Funds_Required,
      Fund_Raised,
      Category,
      Image,
      Start_Date,
      End_Date,
    } = req.body;

    if (!Project_title || !Funds_Required || !Category) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [result] = await pool.query(
      `INSERT INTO project (
        User_ID, Project_title, Project_Description, Funds_Required,
        Fund_Raised, Category, Image, Project_Status, Created_At,
        Start_Date, End_Date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'Ongoing', NOW(), ?, ?)`,
      [
        AdminUserID,
        Project_title,
        Project_Description || "",
        Funds_Required,
        Fund_Raised || 0,
        Category,
        Image || null,
        Start_Date || null,
        End_Date || null
      ]
    );

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      projectId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error adding project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});


router.put("/projects/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  const {
    Project_title,
    Project_Description,
    Funds_Required,
    Fund_Raised,
    Category,
    Image,
    Project_Status,
    Start_Date,
    End_Date,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE project 
       SET Project_title = ?, 
           Project_Description = ?, 
           Funds_Required = ?, 
           Fund_Raised = ?, 
           Category = ?, 
           Image = ?, 
           Project_Status = ?, 
           Start_Date = ?, 
           End_Date = ?
       WHERE Project_ID = ?`,
      [
        Project_title,
        Project_Description,
        Funds_Required,
        Fund_Raised,
        Category,
        Image,
        Project_Status,
        Start_Date || null,
        End_Date || null,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true, message: "Project updated successfully" });
  } catch (err) {
    console.error("❌ Error updating project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
});


router.delete("/projects/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `DELETE FROM project WHERE Project_ID = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;
