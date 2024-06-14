const mongoose = require('mongoose');

// middleware to ensure MongoDB connection
const connectDB = function (handler) {
  return async function (req, res) {
    if (mongoose.connections[0].readyState) {
      console.log('Connected to database:', mongoose.connections[0].name);
      return handler(req, res);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database:', mongoose.connections[0].name);
    return handler(req, res);
  };
};

module.exports = connectDB;