const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpStore = new Map();
const OTP_EXPIRY_MS = 10 * 60 * 1000;

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtpEmail = async (toEmail, otp, purpose) => {
  const appName = process.env.APP_NAME || "Alumni Sphere";
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpSecure = process.env.SMTP_SECURE === "true";

  if (!smtpUser || !smtpPass || !smtpHost) {
    return { sent: false, reason: "SMTP credentials are not configured" };
  }

  let nodemailer;
  try {
    nodemailer = require("nodemailer");
  } catch (error) {
    return { sent: false, reason: "nodemailer package is not installed" };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const purposeLabel = purpose === "signup" ? "email verification" : "password reset";

  await transporter.sendMail({
    from: process.env.SMTP_FROM || `"${appName}" <${smtpUser}>`,
    to: toEmail,
    subject: `${appName} ${purposeLabel} OTP`,
    text: `Your ${purposeLabel} OTP is ${otp}. It is valid for 10 minutes.`,
  });

  return { sent: true };
};

// SIGNIN
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Join User_Table with User_Type_Table
    const [rows] = await pool.query(
      `SELECT u.*, ut.User_Type_name 
       FROM User_Table u 
       JOIN User_Type_Table ut ON u.User_Type_ID = ut.User_Type_ID 
       WHERE u.Email_ID = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.Password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //Include role info in token
    const token = jwt.sign(
      { id: user.User_ID, email: user.Email_ID, role: user.User_Type_ID },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    const { Password, ...userWithoutPassword } = user;

    res.json({
      message: "Signin successful",
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


//SIGNUP

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      primaryPhone,
      secondaryPhone,
      email,
      password,
      address,
      currentYear,
      endYear,
      jobTitle,
      companyName,
      city,
      country,
      sector,
      skills,
      scholarId,
      department,
      branch
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: "Please provide a valid email address" });
    }

    const [existingUser] = await pool.query(
      "SELECT User_ID FROM User_Table WHERE Email_ID = ? LIMIT 1",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ error: "Email is already registered. Please sign in." });
    }

    const signupOtpRecord = otpStore.get(email);
    if (!signupOtpRecord || signupOtpRecord.purpose !== "signup" || !signupOtpRecord.verified) {
      return res.status(400).json({ error: "Please verify your email with OTP before signing up" });
    }

    if (Date.now() > signupOtpRecord.expiresAt) {
      otpStore.delete(email);
      return res.status(400).json({ error: "Email verification OTP expired. Please verify again." });
    }

    const thisYear = new Date().getFullYear();
    let userTypeId = 2; 
    if (endYear && parseInt(endYear) < thisYear) {
      userTypeId = 1; 
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO User_Table 
        (User_Type_ID, User_Fname, User_Lname, Gender, Phone_no, Phone_no_2, Email_ID, Password, Address) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userTypeId, firstName, lastName, gender, primaryPhone, secondaryPhone, email, hashedPassword, address]
    );

    const userId = result.insertId;

    if (userTypeId === 2) {
      await pool.query(
        `INSERT INTO Student_Table (User_ID, Scholar_No, Department, Course, Current_Year, Graduation_Year) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, scholarId, department, branch, currentYear, endYear]
      );
    } else if (userTypeId === 1) {
      const alumniId = Math.floor(10000 + Math.random() * 90000); 

await pool.query(
  `INSERT INTO Alumni_Table (
    Alumni_ID, User_ID, Enrollment_No, Department, Course, Graduation_Year,
    Job_Title, Company_Name, Current_City, Current_Country, Sector, Skills
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  [alumniId, userId, scholarId, department, branch, endYear, jobTitle, companyName, city, country, sector, skills]
);


    }

    otpStore.delete(email);
    res.status(201).json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.sendOtp = async (req, res) => {
  const { email, purpose = "reset_password" } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    if (purpose === "reset_password") {
      const [rows] = await pool.query("SELECT User_ID FROM User_Table WHERE Email_ID = ? LIMIT 1", [email]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "No account found with this email" });
      }
    }

    const otp = generateOtp();
    otpStore.set(email, {
      otp,
      purpose,
      expiresAt: Date.now() + OTP_EXPIRY_MS,
      verified: false,
    });

    const emailResult = await sendOtpEmail(email, otp, purpose);

    const response = {
      message: "OTP sent successfully",
    };

    if (!emailResult.sent && process.env.NODE_ENV !== "production") {
      response.otp = otp;
      response.warning = emailResult.reason;
      console.warn(`OTP for ${email} (${purpose}): ${otp}`);
    }

    return res.json(response);
  } catch (error) {
    console.error("Send OTP error:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp, purpose = "reset_password" } = req.body;

  const otpRecord = otpStore.get(email);
  if (!otpRecord || otpRecord.purpose !== purpose) {
    return res.status(400).json({ error: "OTP not found. Please request a new OTP." });
  }

  if (Date.now() > otpRecord.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired. Please request a new OTP." });
  }

  if (otpRecord.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP." });
  }

  otpStore.set(email, {
    ...otpRecord,
    verified: true,
  });

  return res.json({ message: "OTP verified successfully" });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: "Email and new password are required" });
  }

  const otpRecord = otpStore.get(email);
  if (!otpRecord || otpRecord.purpose !== "reset_password" || !otpRecord.verified) {
    return res.status(400).json({ error: "Please verify OTP before resetting password" });
  }

  if (Date.now() > otpRecord.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ error: "OTP expired. Please request a new OTP." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.query("UPDATE User_Table SET Password = ? WHERE Email_ID = ?", [
      hashedPassword,
      email,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    otpStore.delete(email);
    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Failed to reset password" });
  }
};
