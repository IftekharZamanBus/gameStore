// Import necessary modules - express for web server, path for file path manipulation, dotenv for environment variables
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// Import route modules for games and users
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Set the port from environment variables or default to 5050
const port = process.env.PORT || 5050;

// Import the CORS module for handling Cross-Origin Resource Sharing
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Enable parsing of JSON data in request bodies
app.use(express.json());

// Serve static files from the 'uploads' directory at the '/uploads' URL
app.use("/uploads", express.static("uploads"))

// Use the defined routes for games and users
app.use('/api/games', gameRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware - log errors and send a generic 500 Internal Server Error response
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
