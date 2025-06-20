var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql2/promise');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let db;

(async () => {
  try {
    // Now connect to the created database
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'DogWalkService'
    });

  } catch (err) {
    console.error('Error connecting to the database. Ensure Mysql is running: service mysql start', err);
  }
})();

// Route to return dogs as JSON
app.get('/api/dogs', async (req, res) => {
  try {
    const [dogs] = await db.execute('SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username FROM Dogs JOIN Users ON Dogs.owner_id = Users.user_id');
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

// Route to return open walkrequests as JSON
app.get('/api/walkrequests/open', async (req, res) => {
  try {
    const [requests] = await db.execute('SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.username AS owner_username FROM WalkRequests JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id JOIN Users ON Dogs.owner_id = Users.user_id WHERE WalkRequests.status = "open"');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Route to return walkers summary as JSON
app.get('/api/walkers/summary', async (req, res) => {
  try {
    const [summary] = await db.execute('SELECT Users.username AS walker_username, COUNT(WalkRatings.rating) AS total_ratings, AVG(WalkRatings.rating) AS average_rating, COUNT(WalkRequests.request_id) AS completed_walks FROM WalkRatings JOIN WalkRequests ON WalkRatings.request_id = WalkRequests.request_id JOIN Users ON WalkRequests.walker_id = Users.user_id');
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
