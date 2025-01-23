const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../../models/User")

router.get("/users",async (req,res)=>{
    try{
        const {status} = req.query;
        if(!status){
            const users = await User.find();
            console.log(users);
            res.json({data:
                {users:users}
            })
        }
        console.log(status);    
        const users = await User.find({status})
        console.log(users);
        res.json({data:
            {users:users}
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
          error: {
            code: 500,
            message: "Internal Server Error Occurred! Try again later",
          },
        });
      }
    
})
router.get("/users/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        console.log(id)
        const user = await User.findById(id);
        console.log(user);
        if (!user) {
            return res.status(404).json({
              error: {
                code: 404,
                message: "User not found",
              },
            });
        }

        res.json({
            data:{
                user:user
            }
        })
    }catch (error) {
        console.log(error);
        res.status(500).json({
          error: {
            code: 500,
            message: "Internal Server Error Occurred! Try again later",
          },
        });
      }
})
router.post("/users",async (req,res)=>{
    try{
        let {name , email,status = 'Active'} = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                error: {
                code: 404,
                message: "email is not available",
                },
            });
        }
        user = await User.create({
            name,
            email,
            status:status,
            createdDate:Date.now()
        })
        res.json({
            data:{
                msg:"user created",
                userid:user._id
            }})

    }catch (error) {
        console.log(error);
        res.status(500).json({
          error: {
            code: 500,
            message: "Internal Server Error Occurred! Try again later",
          },
        });
      }
})

router.delete("/users/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(
            id,
            { status: "Inactive" }, 
            { new: true }
        );
        res.json({
            data:{
                user:user
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
          error: {
            code: 500,
            message: "Internal Server Error Occurred! Try again later",
          },
        });
    }
})
router.get("/search",async(req,res)=>{
    try {
        const { query } = req.query; 
    
        if (!query) {
          return res.status(400).json({
            error: {
              code: 400,
              message: "Search query is required",
            },
          });
        }
    
        
        const users = await User.find({
          $or: [
            { name: { $regex: query, $options: "i" } }, // Case-insensitive search on the name
            { email: { $regex: query, $options: "i" } }, // Case-insensitive search on the email
          ],
        });
    
        res.json({
          data: {
            users,
          },
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          error: {
            code: 500,
            message: "Internal Server Error Occurred! Try again later",
          },
        });
      }
})
router.put("/users/:id",async(req,res)=>{
  try {
      const {id} = req.params
      const {name,email,status} = req.body;
      const updatedUser = await User.findByIdAndUpdate(
          id,
          { name,email,status},
          { new: true, runValidators: true } // Return the updated document and validate inputs
      );
      res.json({
          data:{
              user:updatedUser
          }
      })
  } catch (error) {
      console.log(error);
      res.status(500).json({
        error: {
          code: 500,
          message: "Internal Server Error Occurred! Try again later",
        },
      });
  }
})
module.exports = router;