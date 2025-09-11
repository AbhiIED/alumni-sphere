const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const app = express();

app.use(cors());
app.get("/", (req, res) => {
  res.send("Backend API is running 👍");
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM User_Table");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/alumni", async (req, res) => {
  try {
    const [rows] = await pool.query("select * from Alumni_Table");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
