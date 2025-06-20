const express = require('express');
const session = require('express-session'); // for session handling
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// session middleware
app.use(session({
    secret: 'part2exam',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;