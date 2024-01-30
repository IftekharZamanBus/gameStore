// Import the jsonwebtoken library for generating JWT (JSON Web Tokens)
const jwt = require('jsonwebtoken');

// Define a function to generate a JWT token based on a user's ID
const generateToken = (id) => {
    // Sign the token with the user's ID, using the JWT_SECRET from environment variables
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',  // Token expiration time set to 1 day
    });
}

// Export the generateToken function for use in other parts of your application
module.exports = generateToken;
