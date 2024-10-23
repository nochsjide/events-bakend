const mongoose = require('mongoose');
require('dotenv').config();

function connectDB() {
  mongoose.connect(process.env.DB_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
}

module.exports = connectDB;
