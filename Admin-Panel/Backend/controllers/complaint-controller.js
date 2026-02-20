import Complaint from "../models/complaint-model.js";

// Create Complaint
export const createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.status(201).json(complaint);
  } catch (error) {
  console.log(error);   // 👈 VERY IMPORTANT
  res.status(500).json({ message: error.message });
}
};

// Get All Complaints
export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
  console.log(error);   // 👈 VERY IMPORTANT
  res.status(500).json({ message: error.message });
}
};

// Update Status
export const updateComplaint = async (req, res) => {
  try {
    const updated = await Complaint.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  }catch (error) {
  console.log(error);   // 👈 VERY IMPORTANT
  res.status(500).json({ message: error.message });
}
};

// Dashboard Stats
export const getStats = async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const pending = await Complaint.countDocuments({ status: "Pending" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });
    const high = await Complaint.countDocuments({ priority: "High" });

    res.status(200).json({ total, pending, resolved, high });
  } catch (error) {
  console.log(error);   // 👈 VERY IMPORTANT
  res.status(500).json({ message: error.message });
}
};