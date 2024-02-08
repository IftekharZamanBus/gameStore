// Import the uuid library to generate unique identifiers
const { v4: uuidv4 } = require("uuid");

// Import the User model from the '../models/user' file
const User = require("../models/user");
const asyncHandler = require('express-async-handler');

// Import the bcrypt library for password hashing
const bcrypt = require("bcryptjs");

// Import constants, including STATUS, from the '../utils/constants' file
const { STATUS } = require("../utils/constants");

// Import the generateToken function from the '../utils/generateToken' file
const generateToken = require("../utils/generateToken");

// Define a function to handle user login
const login = asyncHandler(async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Find a user in the database with the provided email
  const user = await User.findOne({ where: { email } });

  // If no user is found with the given email, return a 400 Bad Request response
  if (!user) {
    return res.status(400).json({
      error: "Sorry we did not find any user that match with this email address. If you haven't registered, please go through our registration page."
    });
  }

  // Check if the user's account is inactive and return a 400 Bad Request response if it is
  if (user.is_active === STATUS.INACTIVE) {
    return res.status(400).json({
      error: "Sorry your account is not active. Please contact our customer service."
    });
  }

  // Check if the provided password matches the hashed password stored in the database
  if (user && (await bcrypt.compare(password, user.password))) {
    // If the passwords match, create and send a JSON response with user details and a token
    return res.status(200).json({
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      username: user.username,
      role: user.role,
      phone_number: user.phone_number,
      address: user.address,
      is_active: user.is_active,
      token: generateToken(user.id)
    });
  } else {
    // If the passwords do not match, return a 400 Bad Request response
    return res.status(400).json({ error: "Invalid email or password." });
  }
});

// Define a function to handle user registration
const register = asyncHandler(async (req, res) => {
  // Extract user information from the request body
  const { full_name, email, password, username, role, phone_number, address } = req.body;

  try {
    // Check if a user with the provided email already exists in the database
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      // If the user already exists, return a 400 Bad Request response
      return res.status(400).json({ error: "Email already exists" });
    }

    // Generate a salt and hash the provided password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user in the database with the hashed password
    const user = await User.create({
      id: uuidv4(),
      full_name,
      email,
      password: hashedPassword,
      role,
      username,
      phone_number,
      address,
    });

    // Send a JSON response with the created user details
    res.status(201).json(user);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define a function to get a user by their ID
const getUserById = asyncHandler(async (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.id;
  try {
    // Find a user by their ID using Sequelize's findByPk method
    const user = await User.findByPk(userId);
    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Send the retrieved user as a JSON response
    res.json(user);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a function to get all users
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // Retrieve all users from the database using Sequelize's findAll method
    const users = await User.findAll();
    // Send the retrieved users as a JSON response
    res.json(users);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a function to update an existing user
const updateUser = asyncHandler(async (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.id;

  // Extract user information from the request body
  const { full_name, email, password, username, role, phone_number, address } = req.body;

  try {
    // Find the user by their ID using Sequelize's findByPk method
    const user = await User.findByPk(userId);
    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user properties as needed
    user.full_name = full_name;
    user.email = email;
    user.username = username;
    user.role = role;
    user.phone_number = phone_number;
    user.address = address;

    // If a new password is provided, generate a salt and hash the new password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    // Save the updated user to the database
    await user.save();

    // Send the updated user as a JSON response
    res.json(user);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a function to delete a user by their ID
const deleteUser = asyncHandler(async (req, res) => {
  // Extract the user ID from the request parameters
  const userId = req.params.id;

  try {
    // Find the user by their ID using Sequelize's findByPk method
    const user = await User.findByPk(userId);
    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user from the database
    await user.destroy();

    // Send a 204 No Content response indicating successful deletion
    res.status(204).send();
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export all the defined functions as an object
module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
