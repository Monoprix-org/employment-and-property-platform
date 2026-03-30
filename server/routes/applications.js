const express = require("express");
const router = express.Router();
const pool = require("../db/connection");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

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

// GET my applications (worker only)
router.get("/my", authMiddleware, async (req, res) => {
  if (req.user.role !== "worker") {
    return res.status(403).json({ message: "Only workers can view their applications" });
  }

  try {
    const [rows] = await pool.query(
      `SELECT
        applications.*,
        jobs.title,
        jobs.job_type,
        jobs.location,
        jobs.pay_rate,
        jobs.job_date,
        users.name AS employer_name
      FROM applications
      JOIN jobs ON applications.job_id = jobs.id
      JOIN users ON jobs.created_by = users.id
      WHERE applications.user_id = ?
      ORDER BY applications.created_at DESC`,
      [req.user.id]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Fetch my applications error:", err);
    return res.status(500).json({ message: "Error fetching my applications" });
  }
});

module.exports = router;