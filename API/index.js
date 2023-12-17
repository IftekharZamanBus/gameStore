const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 5050;

const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"))

const gameRoutes = require('./routes/gameRoutes');
app.use('/api', gameRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});