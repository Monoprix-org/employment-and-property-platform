// server/routes/listings.js
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

function canCreateListing(role, listingType) {
  if (role === 'property_owner') {
    return ['rent_out', 'sell_out'].includes(listingType);
  }
  if (role === 'customer') {
    return ['rent_wanted', 'buy_wanted'].includes(listingType);
  }
  return false;
}

// GET all listings
router.get('/', async (req, res) => {
  const {
    listingType,
    keyword,
    city,
    minPrice,
    maxPrice,
    propertyType,
    bedrooms,
    sort = 'newest'
  } = req.query;

  let sql = `
    SELECT listings.*, users.name AS author_name, users.role AS author_role
    FROM listings
    JOIN users ON listings.user_id = users.id
    WHERE listings.status = 'active'
  `;
  const params = [];

  if (listingType) {
    sql += ' AND listings.listing_type = ?';
    params.push(listingType);
  }

  if (keyword) {
    sql += ' AND (listings.title LIKE ? OR listings.description LIKE ?)';
    params.push(`%${keyword}%`, `%${keyword}%`);
  }

  if (city) {
    sql += ' AND listings.city LIKE ?';
    params.push(`%${city}%`);
  }

  if (propertyType) {
    sql += ' AND listings.property_type = ?';
    params.push(propertyType);
  }

  if (bedrooms) {
    sql += ' AND listings.bedrooms = ?';
    params.push(Number(bedrooms));
  }

  if (minPrice) {
    sql += ' AND listings.price >= ?';
    params.push(Number(minPrice));
  }

  if (maxPrice) {
    sql += ' AND listings.price <= ?';
    params.push(Number(maxPrice));
  }

  if (sort === 'price_asc') {
    sql += ' ORDER BY listings.price ASC';
  } else if (sort === 'price_desc') {
    sql += ' ORDER BY listings.price DESC';
  } else {
    sql += ' ORDER BY listings.created_at DESC';
  }

  try {
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching listings' });
  }
});

// GET my listings
router.get('/mine', authMiddleware, async (req, res) => {
  if (!['customer', 'property_owner'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only customer/property_owner can use marketplace' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM listings WHERE user_id = ? ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching my listings' });
  }
});

// GET one listing
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT listings.*, users.name AS author_name, users.phone AS author_phone
       FROM listings
       JOIN users ON listings.user_id = users.id
       WHERE listings.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching listing detail' });
  }
});

// CREATE listing
router.post('/', authMiddleware, async (req, res) => {
  if (!['customer', 'property_owner'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Only customer/property_owner can create listings' });
  }

  const {
    title,
    description,
    listing_type,
    property_type,
    price,
    suburb,
    city,
    state,
    postcode,
    address_line,
    bedrooms,
    bathrooms,
    car_spaces,
    area_size,
    contact_name,
    contact_phone
  } = req.body;

  if (!title || !description || !listing_type) {
    return res.status(400).json({ message: 'Title, description and listing type are required' });
  }

  if (!canCreateListing(req.user.role, listing_type)) {
    return res.status(403).json({ message: 'This role cannot create this listing type' });
  }

  try {
    await pool.query(
      `INSERT INTO listings
      (user_id, title, description, listing_type, property_type, price, suburb, city, state, postcode, address_line, bedrooms, bathrooms, car_spaces, area_size, contact_name, contact_phone, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')`,
      [
        req.user.id,
        title,
        description,
        listing_type,
        property_type || 'apartment',
        price || null,
        suburb || null,
        city || null,
        state || null,
        postcode || null,
        address_line || null,
        bedrooms || null,
        bathrooms || null,
        car_spaces || null,
        area_size || null,
        contact_name || null,
        contact_phone || null
      ]
    );

    res.status(201).json({ message: 'Listing created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating listing' });
  }
});

// UPDATE listing
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM listings WHERE id = ? AND user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found or not authorized' });
    }

    const {
      title,
      description,
      price,
      suburb,
      city,
      state,
      postcode,
      address_line,
      bedrooms,
      bathrooms,
      car_spaces,
      area_size,
      contact_name,
      contact_phone
    } = req.body;

    await pool.query(
      `UPDATE listings
       SET title = ?, description = ?, price = ?, suburb = ?, city = ?, state = ?, postcode = ?,
           address_line = ?, bedrooms = ?, bathrooms = ?, car_spaces = ?, area_size = ?,
           contact_name = ?, contact_phone = ?
       WHERE id = ?`,
      [
        title,
        description,
        price || null,
        suburb || null,
        city || null,
        state || null,
        postcode || null,
        address_line || null,
        bedrooms || null,
        bathrooms || null,
        car_spaces || null,
        area_size || null,
        contact_name || null,
        contact_phone || null,
        req.params.id
      ]
    );

    res.json({ message: 'Listing updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating listing' });
  }
});

// UPDATE listing status
router.patch('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ['active', 'pending', 'rented', 'sold', 'closed'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const [rows] = await pool.query(
      `SELECT * FROM listings WHERE id = ? AND user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found or not authorized' });
    }

    await pool.query(
      `UPDATE listings SET status = ? WHERE id = ?`,
      [status, req.params.id]
    );

    res.json({ message: 'Listing status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating listing status' });
  }
});

// DELETE listing
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM listings WHERE id = ? AND user_id = ?`,
      [req.params.id, req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Listing not found or not authorized' });
    }

    await pool.query(`DELETE FROM listings WHERE id = ?`, [req.params.id]);

    res.json({ message: 'Listing deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting listing' });
  }
});

module.exports = router;