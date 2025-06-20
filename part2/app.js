const express = require('express');
const session = require('express-session'); // for session handling
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));
// session middleware
app.use(session({
    secret: 'part2exam',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

// add path to dog routes
app.use('/api/owners', dogRoutes);
app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;