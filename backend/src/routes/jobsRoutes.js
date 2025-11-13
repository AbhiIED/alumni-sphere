const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/* ===========================================================
   GET ALL JOBS
   =========================================================== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT Job_ID, Job_Title, Company_Name, Location, Description, 
              Application_Link, Apply_From, Apply_To, Created_At 
       FROM Job_Postings 
       ORDER BY Created_At DESC`
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

/* ===========================================================
   POST A NEW JOB
   =========================================================== */
router.post("/", async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      description,
      applyLink,
      applyFrom,
      applyTo,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !company ||
      !location ||
      !description ||
      !applyFrom ||
      !applyTo
    ) {
      return res
        .status(400)
        .json({ error: "Please fill all required fields." });
    }

    // Validate date range
    if (new Date(applyFrom) > new Date(applyTo)) {
      return res.status(400).json({
        error: "Apply To date must be greater than or equal to Apply From date.",
      });
    }

    const query = `
      INSERT INTO Job_Postings
      (Job_Title, Company_Name, Location, Description, Application_Link, 
       Apply_From, Apply_To, Created_At)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    await pool.query(query, [
      title,
      company,
      location,
      description,
      applyLink || null,
      applyFrom,
      applyTo,
    ]);

    res.json({ success: true, message: "Job posted successfully!" });
  } catch (err) {
    console.error("❌ Error posting job:", err);
    res.status(500).json({ error: "Failed to post job" });
  }
});

module.exports = router;
