import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Server connected to the MongoDB database ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error in connecting to the Database:`, error);
  }
};

export default connectDB;
