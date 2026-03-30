// server/routes/inquiries.js
const express = require('express');
const router = express.Router();
const pool = require('../db/connection');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Create inquiry
router.post('/', authMiddleware, async (req, res) => {
  if (!['customer', 'property_owner'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only customer/property_owner can use inquiries' });
  }

  const { listing_id, message, phone } = req.body;

  if (!listing_id || !message) {
    return res.status(400).json({ message: 'listing_id and message are required' });
  }

  try {
    const [listingRows] = await pool.query(
      `SELECT * FROM listings WHERE id = ?`,
      [listing_id]
    );

    if (listingRows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const listing = listingRows[0];

    if (listing.user_id === req.user.id) {
      return res.status(400).json({ message: 'You cannot inquire about your own listing' });
    }

    await pool.query(
      `INSERT INTO inquiries (listing_id, sender_id, receiver_id, message, phone, status)
       VALUES (?, ?, ?, ?, ?, 'new')`,
      [listing_id, req.user.id, listing.user_id, message, phone || null]
    );

    res.status(201).json({ message: 'Inquiry sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending inquiry' });
  }
});

// My sent inquiries
router.get('/sent', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT inquiries.*, listings.title, listings.listing_type
       FROM inquiries
       JOIN listings ON inquiries.listing_id = listings.id
       WHERE inquiries.sender_id = ?
       ORDER BY inquiries.created_at DESC`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching sent inquiries' });
  }
});

// My received inquiries
router.get('/received', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT inquiries.*, listings.title, listings.listing_type, users.name AS sender_name, users.email AS sender_email
       FROM inquiries
       JOIN listings ON inquiries.listing_id = listings.id
       JOIN users ON inquiries.sender_id = users.id
       WHERE inquiries.receiver_id = ?
       ORDER BY inquiries.created_at DESC`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching received inquiries' });
  }
});

module.exports = router;