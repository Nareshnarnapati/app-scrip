const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config();
const uri = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
    return Promise.reject();
  }
};

module.exports = connectDb;