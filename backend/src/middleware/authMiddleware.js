const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Not authorized, token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!process.env.JWT_SECRET) {
      console.error("CRITICAL CONFIGURATION ERROR: process.env.JWT_SECRET is missing.");
      return res.status(500).json({
        message: "Server configuration error: JWT secret is missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, invalid token",
    });
  }
};

module.exports = protect;