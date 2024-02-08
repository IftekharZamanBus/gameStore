// Import the Game model from the '../models/game' file
const Game = require('../models/game');
const asyncHandler = require('express-async-handler');

// Define a function to get all games
const getAllGames = async (req, res) => {
  try {
    // Retrieve all games from the database using Sequelize's findAll method
    const games = await Game.findAll();
    // Send the retrieved games as a JSON response
    res.json(games);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define a function to get a game by its ID
const getGameById = async (req, res) => {
  // Extract the game ID from the request parameters
  const gameId = req.params.id;
  try {
    // Retrieve a specific game by its ID using Sequelize's findByPk method
    const game = await Game.findByPk(gameId);
    // If the game is not found, send a 404 Not Found response
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    // Send the retrieved game as a JSON response
    res.json(game);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Define a function to create a new game
const createGame = asyncHandler(async (req, res) => {
  // Extract relevant data from the request body
  const { name, description, quantity, price, is_active } = req.body;

  // Initialize the 'picture' variable with an empty string
  let picture = '';
  
  // Check if the request contains a file and a file path, then assign it to the 'picture' variable
  if (req.file && req.file.path) {
    picture = req.file.path;
  }

  try {
    // Create a new game in the database using Sequelize's create method
    const game = await Game.create({
      name,
      description,
      picture,
      quantity,
      price,
      is_active,
      user_id : req.user.id,
    });
    // Send the created game as a JSON response with a 201 Created status
    res.status(201).json(game);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a function to update an existing game
const updateGame = asyncHandler(async (req, res) => {
  // Extract the game ID from the request parameters
  const gameId = req.params.id;

  // Extract relevant data from the request body
  const { name, description, picture, quantity, price, is_active } = req.body;

  try {
    // Find the game by its ID using Sequelize's findByPk method
    const game = await Game.findByPk(gameId);

    // If the game is not found, send a 404 Not Found response
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Update the game's properties with the new values
    game.name = name;
    game.description = description;
    game.picture = picture;
    game.quantity = quantity;
    game.price = price;
    game.is_active = is_active;

    // Save the updated game to the database
    await game.save();

    // Send the updated game as a JSON response
    res.json(game);
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a function to delete a game by its ID
const deleteGame = async (req, res) => {
  // Extract the game ID from the request parameters
  const gameId = req.params.id;

  try {
    // Find the game by its ID using Sequelize's findByPk method
    const game = await Game.findByPk(gameId);

    // If the game is not found, send a 404 Not Found response
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    // Delete the game from the database
    await game.destroy();

    // Send a 204 No Content response indicating successful deletion
    res.status(204).send();
  } catch (error) {
    // Handle errors by logging them and sending a 500 Internal Server Error response
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Export all the defined functions as an object
module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
