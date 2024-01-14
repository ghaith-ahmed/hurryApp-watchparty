const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb+srv://lafalava477:atdFaqlqjZKpxdaB@cluster0.pos9ca1.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to db");
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
