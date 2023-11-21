import express from "express";
import initiateAllocation from "../controllers/allocationController.js";

const router = express.Router();

// test route
router.get("/allocate", initiateAllocation);

export default router;
