// 'use strict' enforces a stricter set of rules for writing JavaScript code
'use strict';

// Import necessary modules - fs (file system), path, Sequelize, process
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

// Get the base name of the current module file
const basename = path.basename(__filename);

// Determine the environment (development, production, etc.) or default to 'development'
const env = process.env.NODE_ENV || 'development';

// Load the database configuration from 'config/config.json' based on the environment
const config = require(__dirname + '/../config/config.json')[env];

// Initialize an empty object to hold the Sequelize models
const db = {};

// Initialize Sequelize using the configuration from 'config.json' or an environment variable
let sequelize;
if (config.use_env_variable) {
  // If an environment variable is provided, use it for Sequelize connection
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log('Using environment variable');
} else {
  // If not, use the configuration from 'config.json'
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log('Using config.json');
}

// Read all files in the current directory, filter out non-JS files, and import Sequelize models
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // Import each model file and initialize the model using the Sequelize instance
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // Add the model to the 'db' object with its name as the key
    db[model.name] = model;
  });

// Associate models if they have an 'associate' function
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the sequelize instance and Sequelize constructor to the 'db' object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export the 'db' object for use in other parts of the application
module.exports = db;
