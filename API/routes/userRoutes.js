// Import the express library to create the router
const express = require('express');
const router = express.Router();

// Import the userController module for handling user-related routes
const userController = require('../controllers/userController');

const { protect, admin } = require('../middleware/authMiddleware');

// Define routes using the router

// Route to get all users
router.get('/', userController.getAllUsers);

// Route to get a specific user by ID
router.get('/:id', userController.getUserById);

// Route to register a new user
router.post('/register', userController.register);

// Route to handle user login
router.post('/login',userController.login);

// Route to update an existing user
router.put('/:id', [protect], userController.updateUser);

// Route to delete a user by ID
router.delete('/:id', [protect, admin], userController.deleteUser);

// Export the router for use in other parts of your application
module.exports = router;

