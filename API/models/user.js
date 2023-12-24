const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

// Define the User model
const User = db.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
  },
  phone_number: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  is_active: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Y', // Default value: true (available)
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
  timestamps: false, // Automatically generate createdDate and updatedDate,
  underscored: true,
  tableName: 'users', // Set the table name
});

// Export the User model for use in other parts of your application
module.exports = User;
