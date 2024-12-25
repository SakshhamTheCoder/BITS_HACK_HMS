const express = require("express");
const router = express.Router();
const {
  scheduleAppointment,
  getAppointments,
  cancelAppointment,
  addMockData,
} = require("../controllers/appointmentController");

// Schedule an appointment
router.post("/schedule", scheduleAppointment);

// Get all appointments for a user
router.get("/:userId", getAppointments);

// Cancel an appointment
router.delete("/:appointmentId", cancelAppointment);

// Populate Firestore with mock data
router.post("/add-mock-data", addMockData);

module.exports = router;
