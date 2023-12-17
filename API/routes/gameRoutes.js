// Adding all the required middleware and routers.
const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { storage } = require('../utils/multer')
const multer = require('multer');
const multerMiddleware = multer({storage: storage});

// Define routes
router.get('/games', gameController.getAllGames);
router.get('/games/:id', gameController.getGameById);
router.post('/games', multerMiddleware.single('picture'), gameController.createGame);
router.put('/games/:id', gameController.updateGame);
router.delete('/games/:id', gameController.deleteGame);

module.exports = router;