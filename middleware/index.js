const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../models/User");

const checkUserExists = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"];
    const { id } = req.params;

    if (!userId) {
      return res.status(400).json({
        error: {
          code: 400,
          message: "Missing required headers: user-id",
        },
      });
    }

    if (id !== userId) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "No user found with the provided ID",
        },
      });
    }

    console.log(`Checking user with ID: ${userId}`);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          code: 404,
          message: "User not found",
        },
      });
    }

    // If all checks pass, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in checkUserExists middleware:", error);
    return res.status(500).json({
      error: {
        code: 500,
        message: "Internal Server Error Occurred! Try again later.",
      },
    });
  }
};

module.exports = checkUserExists;
