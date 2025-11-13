const { json } = require("body-parser");
const jwt = require("jsonwebtoken");

// ✅ General Token Verification
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ✅ Admin-Only Verification
exports.verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    if (decoded.role !== 3) {
      return res.status(403).json({ error: "Access denied: Admins only" });
    }

    req.user = decoded;
    
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
