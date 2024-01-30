// Import the Sequelize library for interacting with relational databases
const Sequelize = require('sequelize');

// Import the dotenv library for reading environment variables from a .env file
const dotenv = require('dotenv');

// Load environment variables from a .env file into process.env
dotenv.config();

// Export a new instance of Sequelize, configured with the provided database credentials and options
module.exports = new Sequelize(
  process.env.DB_NAME,      // Database name
  process.env.DB_USER,      // Database username
  process.env.DB_PASS,      // Database password
  {
    host: process.env.DB_HOST,      // Database host
    dialect: process.env.DB_DIALECT,  // Database dialect 

    // Connection pool configuration to manage database connections
    pool: {
      max: 5,           // Maximum number of connection in the pool
      min: 0,           // Minimum number of connection in the pool
      acquire: 30000,   // Maximum time, in milliseconds, that a connection can be idle before being released
      idle: 10000,      // Maximum time, in milliseconds, that a connection can be idle before being closed
    },
  }
);
