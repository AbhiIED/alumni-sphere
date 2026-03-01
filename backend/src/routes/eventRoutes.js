const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const { verifyAdmin } = require("../middleware/authMiddleware"); //  Admin token verification


router.get("/", async (req, res) => {
  const type = req.query.type; 

  let query = `
    SELECT 
      e.Event_ID,
      e.Event_Name,
      e.Event_Description,
      e.Event_Date,
      e.Event_Type,
      e.Event_Link,
      e.Event_Image, 
      e.Event_Location
    FROM Event_Table e
  `;
if (type === "latest") {
  query += ` ORDER BY e.Creation_Date DESC LIMIT 5;`;
} else {
  query += `
    ORDER BY
      CASE
        WHEN e.Event_Date >= CURDATE() THEN 0
        ELSE 1
      END,
      e.Event_Date ASC;
  `;
}

  try {
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`SELECT * FROM Event_Table WHERE Event_ID = ?`, [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Event not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching event:", err);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});




router.post("/", verifyAdmin, async (req, res) => {
  try {
    const Organizer_ID = req.user.id;


    if (!Organizer_ID) {
      return res.status(403).json({ error: "Organizer ID missing or unauthorized" });
    }

    const {
      Event_ID,
      Event_Name,
      Event_Description,
      Event_Date,
      Creation_Date,
      Event_Type,
      Event_Link,
      Event_Location,
      Event_Image,
    } = req.body;

    if (!Event_ID || !Event_Name || !Event_Date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const query = `
      INSERT INTO Event_Table 
      (Event_ID, Organizer_ID, Event_Name, Event_Description, Event_Date, Creation_Date, Event_Type, Event_Link, Event_Location, Event_Image)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [
      Event_ID,
      Organizer_ID,
      Event_Name,
      Event_Description,
      Event_Date,
      Creation_Date || new Date().toISOString().split("T")[0],
      Event_Type,
      Event_Link,
      Event_Location,
      Event_Image,
    ]);

    res.status(201).json({ message: "✅ Event created successfully" });
  } catch (err) {
    console.error("❌ Error creating event:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});


//Update event
router.put("/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const [result] = await pool.query(`UPDATE Event_Table SET ? WHERE Event_ID = ?`, [data, id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Event not found" });

    res.json({ message: "✅ Event updated successfully" });
  } catch (err) {
    console.error("❌ Error updating event:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// Delete event
router.delete("/:id", verifyAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM Event_Table WHERE Event_ID = ?`, [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Event not found" });

    res.json({ message: "🗑️ Event deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

module.exports = router;
