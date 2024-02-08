// Import the express library to create the router
const express = require('express');
const router = express.Router();

// Import the gameController module for handling game-related routes
const gameController = require('../controllers/gameController');

// Import auth middlware
const { protect, admin } = require('../middleware/authMiddleware');

// Import multer for handling file uploads
const { storage } = require('../utils/multer');
const multer = require('multer');
const multerMiddleware = multer({ storage: storage });

// Define routes using the router

// Route to get all games
router.get('/', gameController.getAllGames);

// Route to get a specific game by ID
router.get('/:id', gameController.getGameById);

// Upload route for handling file uploads
router.post('/upload', multerMiddleware.single('picture'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully' });
});

// Route to create a new game, including file upload using multerMiddleware
router.post('/', [protect, admin, multerMiddleware.single('picture')], gameController.createGame);

// Route to update an existing game
router.put('/:id', [protect, admin,], gameController.updateGame);

// Route to delete a game by ID
router.delete('/:id', [protect, admin,], gameController.deleteGame);

// Export the router for use in other parts of your application
module.exports = router;
