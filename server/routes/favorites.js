// server/routes/favorites.js
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

// GET my favorites
router.get('/', authMiddleware, async (req, res) => {
  if (!['customer', 'property_owner'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only customer/property_owner can use favorites' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT favorites.id AS favorite_id, favorites.created_at AS favorited_at,
              listings.*
       FROM favorites
       JOIN listings ON favorites.listing_id = listings.id
       WHERE favorites.user_id = ?
       ORDER BY favorites.created_at DESC`,
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching favorites' });
  }
});

// TOGGLE favorite
router.post('/:listingId', authMiddleware, async (req, res) => {
  if (!['customer', 'property_owner'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only customer/property_owner can use favorites' });
  }

  const listingId = req.params.listingId;

  try {
    const [listingRows] = await pool.query(
      `SELECT * FROM listings WHERE id = ?`,
      [listingId]
    );

    if (listingRows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const [existing] = await pool.query(
      `SELECT * FROM favorites WHERE user_id = ? AND listing_id = ?`,
      [req.user.id, listingId]
    );

    if (existing.length > 0) {
      await pool.query(
        `DELETE FROM favorites WHERE user_id = ? AND listing_id = ?`,
        [req.user.id, listingId]
      );

      return res.json({
        message: 'Favorite removed',
        isFavorite: false
      });
    }

    await pool.query(
      `INSERT INTO favorites (user_id, listing_id) VALUES (?, ?)`,
      [req.user.id, listingId]
    );

    res.json({
      message: 'Favorite added',
      isFavorite: true
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating favorite' });
  }
});

module.exports = router;