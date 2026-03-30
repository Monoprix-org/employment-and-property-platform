const express = require("express");
const router = express.Router();
const pool = require("../db/connection");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

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

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT jobs.*, users.name AS employer_name
       FROM jobs
       JOIN users ON jobs.created_by = users.id
       ORDER BY jobs.created_at DESC`
    );

    return res.json(rows);
  } catch (err) {
    console.error("Fetch jobs error:", err);
    return res.status(500).json({ message: "Error fetching jobs" });
  }
});

// CREATE job
router.post("/", authMiddleware, async (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Only employers can create jobs" });
  }

  const { title, job_type, description, location, pay_rate, job_date } = req.body;

  if (!title || !job_type || !description || !location || !pay_rate || !job_date) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const allowedJobTypes = ["permanent", "casual", "parttime", "one_off"];
  if (!allowedJobTypes.includes(job_type)) {
    return res.status(400).json({ message: "Invalid job type" });
  }

  try {
    await pool.query(
      `INSERT INTO jobs
      (title, job_type, description, location, pay_rate, job_date, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [title, job_type, description, location, pay_rate, job_date, req.user.id]
    );

    return res.status(201).json({ message: "Job created successfully" });
  } catch (err) {
    console.error("Create job error:", err);
    return res.status(500).json({ message: "Error creating job" });
  }
});

// APPLY to job
router.post("/:id/apply", authMiddleware, upload.single("resume"), async (req, res) => {
  if (req.user.role !== "worker") {
    return res.status(403).json({ message: "Only workers can apply for jobs" });
  }

  const jobId = req.params.id;
  const { phone, cover_letter } = req.body;
  const resumeUrl = req.file ? req.file.filename : null;

  try {
    const [jobRows] = await pool.query(
      "SELECT id FROM jobs WHERE id = ?",
      [jobId]
    );

    if (jobRows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    const [existing] = await pool.query(
      "SELECT id FROM applications WHERE job_id = ? AND user_id = ?",
      [jobId, req.user.id]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "You have already applied for this job" });
    }

    await pool.query(
      `INSERT INTO applications
      (job_id, user_id, phone, resume_url, cover_letter, status)
      VALUES (?, ?, ?, ?, ?, 'applied')`,
      [jobId, req.user.id, phone || null, resumeUrl, cover_letter || null]
    );

    return res.status(201).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error("Apply job error:", err);
    return res.status(500).json({ message: "Error applying for job" });
  }
});

// GET applications for one job
router.get("/:id/applications", authMiddleware, async (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Only employers can view applications" });
  }

  const jobId = req.params.id;

  try {
    const [jobRows] = await pool.query(
      "SELECT id, created_by FROM jobs WHERE id = ?",
      [jobId]
    );

    if (jobRows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (Number(jobRows[0].created_by) !== Number(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to view these applications" });
    }

    const [rows] = await pool.query(
      `SELECT applications.*, users.name, users.email
       FROM applications
       JOIN users ON applications.user_id = users.id
       WHERE applications.job_id = ?
       ORDER BY applications.created_at DESC`,
      [jobId]
    );

    return res.json(rows);
  } catch (err) {
    console.error("Fetch applications error:", err);
    return res.status(500).json({ message: "Error fetching applications" });
  }
});

// DELETE job
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Only employers can delete jobs" });
  }

  const jobId = req.params.id;

  try {
    const [jobRows] = await pool.query(
      "SELECT id, created_by FROM jobs WHERE id = ?",
      [jobId]
    );

    if (jobRows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (Number(jobRows[0].created_by) !== Number(req.user.id)) {
      return res.status(403).json({ message: "Not authorized to delete this job" });
    }

    await pool.query("DELETE FROM jobs WHERE id = ?", [jobId]);

    return res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Delete job error:", err);
    return res.status(500).json({ message: "Error deleting job" });
  }
});

module.exports = router;