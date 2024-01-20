const Game = require('../models/game');

const getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getGameById = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createGame = async (req, res) => {
  const { name, description, quantity, price, isactive, user_id } = req.body;

  let picture = '';
  if (req.file && req.file.path) {
    picture = req.file.path;
  }

  try {
    const game = await Game.create({
      name,
      description,
      picture,
      quantity,
      price,
      isactive,
      user_id,
    });
    res.status(201).json(game);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateGame = async (req, res) => {
  const gameId = req.params.id;
  const { name, description, picture, quantity, price, isactive } = req.body;
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    game.name = name;
    game.description = description;
    game.picture = picture;
    game.quantity = quantity;
    game.price = price;
    game.isactive = isactive;
    await game.save();
    res.json(game);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteGame = async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await Game.findByPk(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    await game.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};