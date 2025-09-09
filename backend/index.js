const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "04862",
  database: "alumnisphere",
});

// ✅ Print User_Table records on startup
// db.query("SELECT * FROM User_Table", (err, results) => {
//   if (err) {
//     console.error("Error fetching users:", err);
//   } else {
//     console.log("📋 User_Table Records:");
//     console.log(results);
//   }
// });

// Signin route
app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // ⚠️ FIX column name: Email_ID (not email)
  db.query("SELECT * FROM User_Table WHERE Email_ID = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];
    //console.log("User found:", user);
    // // ⚠️ FIX column name: Password (not password)
    // const isMatch = bcrypt.compareSync(password, user.Password);

    // if (!isMatch) return res.status(401).json({ error: "Invalid email or password" });

    if (password !== user.Password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.json({
      message: "Signin successful",
      user: { id: user.User_ID, email: user.Email_ID },
    });
  });
});

// Run server
app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
