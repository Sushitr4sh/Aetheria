import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return; // stop the function from running
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Missing MongoDB credentials in environment variables");
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "aetheria",
      serverSelectionTimeoutMS: 50000,
    });

    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
