const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { storage } = require('../utils/multer');
const multer = require('multer');
const multerMiddleware = multer({ storage: storage });

// Define routes
router.get('/', gameController.getAllGames);
router.get('/:id', gameController.getGameById);

// Upload route
router.post('/upload', multerMiddleware.single('picture'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully' });
});

router.post('/', multerMiddleware.single('picture'), gameController.createGame);
router.put('/:id', gameController.updateGame);
router.delete('/:id', gameController.deleteGame);

module.exports = router;
