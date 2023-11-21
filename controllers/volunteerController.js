import adminModel from "../model/adminModel.js";
import volunteerModel from "../model/volunteerModel.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// METHOD:POST || REGISTER VOLUNTEER
const registerVolunteerController = async (req, res) => {
  try {
    const { name, email, phone, location, language, availability } = req.body;
    // validation
    if (!name) {
      return res.send({ messgae: "Name is Required" });
    }
    if (!email) {
      return res.send({ messgae: "Email is Required" });
    }
    if (!phone) {
      return res.send({ messgae: "Phone Number is Required" });
    }
    if (!location) {
      return res.send({ messgae: "Location is Required" });
    }
    if (!language) {
      return res.send({ messgae: "Spoken Language is Required" });
    }
    if (!availability) {
      return res.send({ messgae: "Available Days is Required" });
    }

    // checking if the volunteer has already been registered
    const existingVolunteer = await volunteerModel.findOne({ email });
    if (existingVolunteer) {
      return res.status(200).send({
        success: false,
        message: "Volunteer Already Registered",
      });
    }
    // registering volunteer
    const volunteer = await new volunteerModel({
      name,
      email,
      phone,
      location,
      language,
      availability,
    }).save();

    return res.status(200).send({
      success: true,
      message: "Registration Successful",
      volunteer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// METHOD:GET || Getting List of candidates
const listofcandidates = async (req, res) => {
  try {
    const list = await volunteerModel.find();

    res.status(200).send({
      success: true,
      message: "List of Candidates",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Unable to get list of candidates",
      error,
    });
  }
};

// METHOD:POST || ADMIN LOGIN
const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or password",
      });
    }
    // checking admin
    const admin = await adminModel.findOne({ email });
    if (!admin) {
      res.status(404).send({
        success: false,
        message: "No Admin is registered",
      });
    }

    // decrypting password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // token creation

    const token = JWT.sign({ userId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.status(200).send({
      success: true,
      message: "Logged In Successfully",
      admin: {
        name: admin.name,
        email: admin.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export { registerVolunteerController, listofcandidates, adminLoginController };
