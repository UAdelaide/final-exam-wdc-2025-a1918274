const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to return dogs as JSON (admin/testing)
router.get('/', async (req, res) => {
  try {
    const [dogs] = await db.query('SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id');
    res.json(dogs);
  } catch (error) {
    console.error('SQL Error:', error);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// route to post owner's dog for owner dashboard (question 15)
router.post('/mydog', async (req,res)=>{

});

module.exports = router;

