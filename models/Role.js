const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true
  },
  
  description: {
    type: String,
    required:true
  }
  
});


module.exports = mongoose.model("Role", roleSchema);
