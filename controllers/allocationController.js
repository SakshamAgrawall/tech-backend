import mongoose from "mongoose";
import volunteerModel from "../model/volunteerModel.js";
import Classroom from "../model/classroomModel.js";

// checking number of registration
const checkRegistrationThreshold = async () => {
  try {
    // getting how many registration are there in db
    const registrationCount = await volunteerModel.countDocuments();
    if (registrationCount < 20) {
      console.log("Less than 20 registration");
    } else {
      return registrationCount >= 20;
    }
    // return res.status(200).send({
    //   success: true,
    //   message: "Count",
    //   registrationCount,
    // });
  } catch (error) {
    console.log("Error in Checking registration:", error);
  }
};

// alloting the volunteers to the classroom
const allotingVolunteer = async () => {
  try {
    if (await checkRegistrationThreshold()) {
      // getting classroom data from the db
      const classroomData = await Classroom.find();
      for (const classroom of classroomData) {
        const match = await volunteerModel
          // using aggregation operators
          .find({
            $and: [
              // criteria for matching with language requirement
              { language: { $in: classroom.languageRequirement } },
            ],
          })
          .limit(classroom.requirement);
        console.log(
          `Allocating volunteers to ${classroom.classroomID}:`,
          match
        );
        // updating classroom data in the database with volunteers
        await Classroom.findByIdAndUpdate(
          classroom._id,
          { $push: { allocatedVolunteers: { $each: match } } },
          { new: true }
        );
      }
    }
  } catch (error) {
    console.log("Error in Alloting Volunteers:", error);
  }
};

const initiateAllocation = async () => {
  try {
    await allotingVolunteer();
  } catch (error) {
    console.log("Error in intiating process:", error);
  }
};

export default initiateAllocation;
