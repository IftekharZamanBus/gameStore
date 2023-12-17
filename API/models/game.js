const { Sequelize, DataTypes } = require('sequelize');

// Create a new instance of Sequelize and connect to your database
const sequelize = new Sequelize('reactDB', 'postgres', 'Draco_3111', {
  host: 'localhost',
  dialect: 'postgres', // Change the dialect based on your database type (e.g., 'mysql' for MySQL)
});

// Define the Game model
const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING, // Assuming you store the image URL
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Default value: true (available)
  },
}, {
  timestamps: true, // Automatically generate createdDate and updatedDate
  tableName: 'games-table', // Set the table name
});

// Export the Game model for use in other parts of your application
module.exports = Game;
