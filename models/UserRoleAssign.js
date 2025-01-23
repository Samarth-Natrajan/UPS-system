const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserRoleAssignSchema = new mongoose.Schema({
  roleId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"role"
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
  },
  assignedDate:{
    type:Date,
    default:Date.now
  }
  
  
  
});


module.exports = mongoose.model("UserRoleAssign",UserRoleAssignSchema);
