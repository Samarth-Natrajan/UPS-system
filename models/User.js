const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],

  },
  email: {
    type: String,
    //required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    //match: [/.+@.+\..+/, 'Please enter a valid email address'], // Email validation regex
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'], // Restrict to these two values
    default: 'Active',
  },
  createdDate: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});


module.exports = mongoose.model("User", userSchema);
