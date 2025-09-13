const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query user by email
    const [rows] = await db.query(
      "SELECT * FROM User_Table WHERE Email_ID = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    // Plain text password check
    if (password !== user.Password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.User_ID, email: user.Email_ID },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    // Remove password before sending user object
    const { Password, ...userWithoutPassword } = user;

    res.json({
      message: "Signin successful",
      token,
      user: userWithoutPassword, // send the DB record minus password
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
