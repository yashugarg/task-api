const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/.env" });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    console.log("_---");
    process.exit(1);
  }
};

module.exports = connectDB;
