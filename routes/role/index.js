const express = require("express");
const router = express.Router();
require("dotenv").config();
const Role = require("../../models/Role")
const UserRoleAssign = require("../../models/UserRoleAssign");


router.post("/roles",async(req,res)=>{
    try {
        const {name,description} = req.body;
        let role = await Role.findOne({ name });
        if(role){
            return res.status(404).json({
                error: {
                code: 404,
                message: "role already exists",
                },
            });
        }
        role = await Role.create({
            name,
            description
        })
        res.json({
            role:role
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
router.get("/roles",async(req,res)=>{
    try {
        const roles = await Role.find();
        res.json({
            data:{
                roles:roles
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
router.get("/roles/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const role = await Role.findById(id);
        res.json({
            data:{
                roles:role
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
router.put("/roles/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const {name,description} = req.body;
        const updatedRole = await Role.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true } // Return the updated document and validate inputs
        );
        res.json({
            data:{
                role:updatedRole
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
router.delete("/roles/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const role = Role.findById(id);
        if (!role)
            return res.status(404).json({
              error: {
                code: 404,
                message: "no role found with this id",
              },
        });
        await UserRoleAssign.deleteMany({ roleId: id });
        await Role.findByIdAndDelete(id);
        res.status(200).json({
            message: "Role deleted successfully",
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
module.exports = router;