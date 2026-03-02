import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../db/index.js";

dotenv.config({ path: "./.env" });

const listCollections = async () => {
  try {
    await connectDB();
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections:", collections.map(c => c.name));
    
    if (collections.find(c => c.name === 'workers')) {
        const count = await mongoose.connection.db.collection('workers').countDocuments();
        console.log(`'workers' collection has ${count} documents.`);
    } else {
        console.log("'workers' collection does not exist.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

listCollections();
