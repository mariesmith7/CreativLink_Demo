const mongoose = require("mongoose");
require('dotenv').config();

// connect to mongoose
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // stops the app if connections does fail 
  }
};

module.exports = connectDB;
