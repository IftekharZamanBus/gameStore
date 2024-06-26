// Import necessary Sequelize components - Sequelize and DataTypes
const { Sequelize, DataTypes } = require("sequelize");

// Import the Sequelize instance (initialized connection to the database) from the '../config/database' file
const db = require("../config/database");
const { ORDER_STATUS } = require("../utils/constants");

// Define the Game model using Sequelize's define method
const OrderDetails = db.define(
  "OrderDetails",
  {
    // Define the 'id' field with type UUID, a default value generated by UUIDV4, and set it as the primary key
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "orders", // Name of the referenced table
        key: "id", // Primary key of the referenced table
      },
    },

    game_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "games", // Name of the referenced table
        key: "id", // Primary key of the referenced table
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    // Define the 'price' field with type FLOAT, and it cannot be null
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    created_at: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updated_at: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    // Sequelize model configuration options:

    // Disable timestamps (created_at and updated_at) since 'created_at' and 'updated_at' fields are explicitly defined
    timestamps: false,

    // Use underscored naming (e.g., snake_case) for automatically added fields like foreign keys
    underscored: true,

    // Set the table name to 'games'
    tableName: "order_details",
  }
);

// Export the Game model for use in other parts of your application
module.exports = OrderDetails;
