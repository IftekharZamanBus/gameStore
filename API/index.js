const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5050;

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname); 
  },
});

const getExtenstion = mimetype => {
  switch(mimetype){
      case "image/png":
          return ".png"
      case "image/jpeg":
          return ".jpeg"
      case "image/jpg":
          return ".jpg"
      
  }
}

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const imagePath = path.join(__dirname, req.file.path); 
  res.status(200).json({ message: 'File uploaded successfully', imagePath });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const gameRoutes = require('./routes/gameRoutes');
app.use('/api', gameRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});