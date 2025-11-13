const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

// 💰 1️⃣ Fetch all donation projects
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        Project_ID AS id,
        Project_title AS title,
        Project_Description AS description,
        Image AS image,
        Fund_Raised AS raised,
        Funds_Required AS target,
        Category AS category
      FROM project
    `);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 💳 2️⃣ Get Razorpay public key
router.get("/get-key", (req, res) => {
  try {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error("Error fetching Razorpay key:", err);
    res.status(500).json({ error: "Failed to get Razorpay key" });
  }
});

// 💰 3️⃣ Fetch a single donation project by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
      SELECT 
        Project_ID AS id,
        Project_title AS title,
        Project_Description AS description,
        Image AS image,
        Fund_Raised AS raised,
        Funds_Required AS target,
        Category AS category
      FROM project
      WHERE Project_ID = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.json(rows[0]); 
  } catch (err) {
    console.error("Error fetching project by ID:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// 💳 4️⃣ Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 💳 5️⃣ Create Razorpay order
router.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

// 💳 6️⃣ Verify Razorpay payment
router.post("/verify-payment", (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const body = order_id + "|" + payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature === signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Error verifying Razorpay payment:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;
