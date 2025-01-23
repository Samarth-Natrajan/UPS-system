const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../../models/User")


const checkUserExists = async (userId) => {
    try {
      const user = await User.findOne({ userId});
      return user; 
    } catch (error) {
      throw new Error("Error checking user existence: " + error.message);
    }
}
module.exports = checkUserExists