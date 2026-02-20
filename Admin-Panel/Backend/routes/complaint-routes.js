import express from "express";
import {
  createComplaint,
  getAllComplaints,
  updateComplaint,
  getStats,
} from "../controllers/complaint-controller.js";

const router = express.Router();

// Base: /api/complaints
router.post("/", createComplaint);
router.get("/", getAllComplaints);
router.put("/:id", updateComplaint);
router.get("/stats/all", getStats);

export default router;