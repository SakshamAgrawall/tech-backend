import mongoose from "mongoose";
import dotenv from "dotenv";
import Classroom from "./model/classroomModel.js";

dotenv.config();

const classroomData = async () => {
  let connection;
  try {
    const data = [
      {
        classroomID: "AHM01",
        capacity: 5,
        requirement: 2,
        subjects: ["Maths", "Science"],
        languageRequirement: ["Gujarati", "Hindi"],
        location: "Ahmedabad",
      },
      {
        classroomID: "AHM02",
        capacity: 5,
        requirement: 4,
        subjects: ["Maths", "Science", "English", "Social Studies"],
        languageRequirement: [],
        location: "Ahmedabad",
      },
      {
        classroomID: "CHE01",
        capacity: 3,
        requirement: 2,
        subjects: ["English", "Social Studies"],
        languageRequirement: ["Tamil"],
        location: "Chennai",
      },
      {
        classroomID: "CHE02",
        capacity: 3,
        requirement: 2,
        subjects: ["Maths"],
        languageRequirement: [],
        location: "Chennai",
      },
      {
        classroomID: "BLR01",
        capacity: 3,
        requirement: 2,
        subjects: ["Maths", "Science"],
        languageRequirement: [],
        location: "Bengaluru",
      },
      {
        classroomID: "BLR02",
        capacity: 2,
        requirement: 1,
        subjects: ["English"],
        languageRequirement: [],
        location: "Bengaluru",
      },
    ];
    connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    // inserting data to db
    await Classroom.insertMany(data);
    console.log("Data seeded successfully");
  } catch (error) {
    console.log("Error in seeding data :", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

classroomData();
