const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../models/User")


const checkUserExists = async (req,res,next) => {
    try {
      const userId = req.headers["user-id"];
      if (!userId) {
        return res.status(400).json({
          error: {
            code: 400,
            message: "Missing required headers: user-id",
          }
        });
      }
      console.log(userId);
      const user = await User.findOne({_id:userId});
      if(!user){
        return res.status(404).json({
          error:{
            code:404,
            message:"No user found"
          }
        })
      }
      next(); 
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: {
          code: 500,
          message: "Internal Server Error Occurred! Try again later.",
        },
      })
    };
}
module.exports = checkUserExists