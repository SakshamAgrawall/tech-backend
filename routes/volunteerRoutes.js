import express from "express";
import {
  adminLoginController,
  listofcandidates,
  registerVolunteerController,
} from "../controllers/volunteerController.js";
// import { requireAdminSignIn } from "../middlewares/authMiddleware.js";

// router object

const router = express.Router();

// volunteer registration
router.post("/register", registerVolunteerController);

// Geting list of volunteers
router.get("/listofcandidates", listofcandidates);

// admin login
router.post("/admin", adminLoginController);
export default router;
