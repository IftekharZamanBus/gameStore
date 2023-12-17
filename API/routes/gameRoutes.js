// Adding all the required middleware and routers.
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// Define routes
router.get('/games', gameController.getAllGames);
router.get('/games/:id', gameController.getGameById);
router.post('/games', gameController.createGame);
router.put('/games/:id', gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);

module.exports = router;