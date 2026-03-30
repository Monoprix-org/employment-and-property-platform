const express = require("express");
const router = express.Router();
const pool = require("../db/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const ALLOWED_ROLES = [
  "worker",
  "employer",
  "customer",
  "property_owner"
];

// auth middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// register
router.post("/register", async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    phone,
    nin_number,
    bank_account_number
  } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All required fields are needed" });
  }

  if (!ALLOWED_ROLES.includes(role)) {
    return res.status(400).json({ message: "Invalid role selected" });
  }

  if (role === "worker" && (!nin_number || !bank_account_number)) {
    return res.status(400).json({
      message: "NIN Number and Bank Account Number are required for workers"
    });
  }

  try {
    const [existingUsers] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users
      (name, email, password_hash, role, phone, nin_number, bank_account_number)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        hashedPassword,
        role,
        phone || null,
        role === "worker" ? nin_number : null,
        role === "worker" ? bank_account_number : null
      ]
    );

    return res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error during registration" });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone || null
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
});

// current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, role, phone
       FROM users
       WHERE id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(rows[0]);
  } catch (err) {
    console.error("Fetch current user error:", err);
    return res.status(500).json({ message: "Server error fetching user" });
  }
});

module.exports = router;