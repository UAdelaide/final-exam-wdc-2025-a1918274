const express = require('express');
const router = express.Router();
const db = require('../models/db');

// Route to return dogs as JSON
router.get('/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute('SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id');
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// Route to return open walkrequests as JSON
router.get('/api/walkrequests/open', async (req, res) => {
  try {
    const [requests] = await db.execute('SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id JOIN Users ON Dogs.owner_id = Users.user_id WHERE WalkRequests.status = "open"');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch open walk requests' });
  }
});

// Route to return walkers summary as JSON
router.get('/api/walkers/summary', async (req, res) => {
  try {
    const [summary] = await db.execute('SELECT Users.username AS walker_username, COUNT(WalkRatings.rating) AS total_ratings, AVG(WalkRatings.rating) AS average_rating, COUNT(WalkRequests.request_id) AS completed_walks FROM WalkRatings JOIN WalkRequests ON WalkRatings.request_id = WalkRequests.request_id JOIN Users ON WalkRatings.walker_id = Users.user_id WHERE WalkRequests.status = "completed" GROUP BY Users.username');
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch walkers summary' });
  }
});