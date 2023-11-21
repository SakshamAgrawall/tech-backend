import mongoose from "mongoose";
import dotenv from "dotenv";
import adminModel from "./model/adminModel.js";
import bcrypt from "bcrypt";

dotenv.config();

// Seed the admin data in the database
const seedAdminData = async () => {
  let connection;
  try {
    connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const adminExists = await adminModel.exists({ isAdmin: true });
    if (!adminExists) {
      // hashing the password for privacy
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("admin@1234", saltRounds);
      const adminUser = new adminModel({
        name: "Admin",
        email: "admin@admin.com",
        password: hashedPassword,
        isAdmin: true,
      });
      await adminUser.save();
      console.log("Admin Created Successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.log("Error in seeding data:", error);
  } finally {
    if (connection) {
      connection.disconnect();
      console.log("Disconnected from MongoDB");
    }
  }
};

// Call the seeding function
seedAdminData();
