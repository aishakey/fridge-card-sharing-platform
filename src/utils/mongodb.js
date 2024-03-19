import mongoose from "mongoose";

const connection = { isConnected: null };

async function connectToDb() {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0].readyState;
    console.log("Database connected:", db.connection.name);
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}

export default connectToDb;
