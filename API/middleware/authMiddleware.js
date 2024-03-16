const jwt = require("jsonwebtoken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { ROLE } = require("../utils/constants");

const protect = asyncHandler(async (req, res, next) => {
    let token;
  
    // Check if token exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];
  
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Get user from DB
        req.user = await User.findOne({where: {id: decoded.id}});
        delete req.user.password;
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error("Unauthorized, token failed");
      }
    }
  
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized, no token");
    }
  });

const admin = (req, res, next) => {
    if (req.user && req.user.role === ROLE.ADMIN) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized as an admin");
    }
  }

module.exports = {protect, admin};