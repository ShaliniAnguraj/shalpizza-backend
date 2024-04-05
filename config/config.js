const mongoose = require("mongoose");
const colors = require("colors")


const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    const conn = await mongoose.connect(url, {
    });
    console.log(
      `Mongodb DataBase Connected! ${conn.connection.host}`.bgGreen.green
    );
  } catch (error) {
    console.log(`error: ${error.message}`.bgRed.white);
  }
};

module.exports = connectDB
