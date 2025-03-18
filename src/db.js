const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = "mongodb+srv://akhil:akhil@cluster0.h3lwvdr.mongodb.net/";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected successfully!");
    return client.db("socialMediaDB");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
}

module.exports = connectDB;
