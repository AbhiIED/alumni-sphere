const db = require("../db");

// Signin logic
exports.signin = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM User_Table WHERE Email_ID = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) return res.status(401).json({ error: "Invalid email or password" });

    const user = results[0];

    // ⚠️ Plain text check (later you should switch to bcrypt)
    if (password !== user.Password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
console.log("Signin attempt:", { email, password });
    res.json({
      message: "Signin successful",
      user: { id: user.User_ID, email: user.Email_ID },
      
    });
  });
};
