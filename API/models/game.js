const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

// Define the Game model
const Game = db.define('Game', {
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
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Y', // Default value: true (available)
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users', // Name of the table
      key: 'id', // Primary key of the referenced table
    },
  },
  created_at: {
    type: DataTypes.DATE,
    field: 'created_at',
  },
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at',
  }
}, {
  timestamps: false, // Automatically generate createdDate and updatedDate
  underscored: true,
  tableName: 'games', // Set the table name
});

// Export the Game model for use in other parts of your application
module.exports = Game;