const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ==============================
// ADMIN DASHBOARD STATISTICS API
// ==============================
router.get("/stats", async (req, res) => {
  try {
    // Total Alumni
    const [[alumni]] = await pool.query(
      "SELECT COUNT(*) AS totalAlumni FROM alumni_table"
    );

    // Active Students
    const [[students]] = await pool.query(
      "SELECT COUNT(*) AS activeStudents FROM student_table"
    );

    // Upcoming Events
    const [[events]] = await pool.query(
      "SELECT COUNT(*) AS upcomingEvents FROM event_table WHERE Event_Date >= CURDATE()"
    );

    // Job Postings
    const [[jobs]] = await pool.query(
      "SELECT COUNT(*) AS jobPostings FROM job_postings"
    );

    // TOTAL DONATIONS (sum)
    const [[totalAmount]] = await pool.query(
      "SELECT SUM(Amount) AS totalDonationAmount FROM donation"
    );

    // TOTAL NUMBER OF DONATIONS
    const [[donationCount]] = await pool.query(
      "SELECT COUNT(*) AS totalDonationCount FROM donation"
    );

    res.json({
      totalAlumni: alumni.totalAlumni || 0,
      activeStudents: students.activeStudents || 0,
      upcomingEvents: events.upcomingEvents || 0,
      jobPostings: jobs.jobPostings || 0,

      // ⭐ NEW FIELDS
      totalDonationAmount: totalAmount.totalDonationAmount || 0,
      totalDonationCount: donationCount.totalDonationCount || 0,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ error: "Failed to load dashboard statistics" });
  }
});

module.exports = router;
