const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to return dogs as JSON (admin/testing)
router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.execute('SELECT Dogs.dog_id, Dogs.name AS dog_name, Dogs.size, Dogs.owner_id, Users.username AS owner_username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id');
    // specifically added dog id and owner id for question 17
    res.json(dogs);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// route to post owner's dog for owner dashboard (question 15)
router.get('/mydog', async (req, res) => {
  if (!req.session.user || req.session.user.role !== 'owner') {
    return res.status(403).json({ error: 'not authorised' });
  }

  const ownerID = req.session.user.user_id;

  // connect to db
  try {
    const [rows] = await db.execute(
      'SELECT name, dog_id FROM Dogs WHERE owner_id = ?',
      [ownerID]
    );
    res.json(rows);
  } catch (e) {
    console.error('SQL Error:', e);
    res.status(500).json({ error: "Failed to fetch owner's dogs" });
  }
});

module.exports = router;

