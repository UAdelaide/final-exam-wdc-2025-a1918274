const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to return dogs as JSON
router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.query('SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id');
    res.json(rows);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch walk requests' });
  }
});

module.exports = router;

