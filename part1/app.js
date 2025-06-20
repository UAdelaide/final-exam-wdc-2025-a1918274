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
    const [requests] = await db.execute('SELECT WalkRequests.request_id, Dogs.name AS dog_name, WalkRequests.requested_time, WalkRequests.duration_minutes, WalkRequests.location, Users.');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});



app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
