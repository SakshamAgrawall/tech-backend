import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import allocationController from "./routes/allocationRoute.js";

// config env
dotenv.config();

// database config
connectDB();

// REST object
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api", volunteerRoutes);
// allocation route
app.use("/allocation", allocationController);

// REST API
app.use("/", function (req, res) {
  res.send("<h1>Welcome</h1>");
});

// PORT
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is Listening on ${PORT}`);
});
