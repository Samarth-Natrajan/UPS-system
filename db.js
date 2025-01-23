const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI;
console.log(uri)
const connection = () => mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));
module.exports = connection;