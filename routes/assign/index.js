const express = require("express");
const router = express.Router();
require("dotenv").config();
const UserRoleAssign = require("../../models/UserRoleAssign");

router.post("/user-roles",async(req,res)=>{   
    try {
        const {userId,roleId} = req.body;
        const userRole = UserRoleAssign.findOne({userId,roleId});
        
        if (userRole)
            return res.status(400).json({
              error: {
                code: 401,
                message: "user already assigned this role",
              },
            });
        const assignedUserRole = await UserRoleAssign.create({
            userId,
            roleId,
            assignedDate:Date.now()
        })
        res.json({
            data:{
                assign:assignedUserRole
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
router.get("/user-roles", async (req, res) => {
    try {
      const { query } = req.query;
        
      const userRoles = await UserRoleAssign.find({
        $or: [
          { userId:query }, //  search on the userId
          { roleId:query }, //  search on the roleId
        ],
      })
      if (userRoles.length === 0) {
        return res.status(404).json({
          message: "No user-role assignments found",
        });
      }
  
      
      res.json({
        data: {
          userRoles,
        },
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
});
router.delete("/user-roles/:id",async(req,res)=>{
  try {
      const {id} = req.params;
      const result = await UserRoleAssign.deleteMany({userId: id });
      res.json({
        data:{
          result
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
module.exports = router
