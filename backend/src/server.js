const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
require('dotenv').config(); // Also here, if needed


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend API is running 👍");
});

// Users route
app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM User_Table");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Alumni route
app.get("/alumni", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Alumni_Table");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Import and mount auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
