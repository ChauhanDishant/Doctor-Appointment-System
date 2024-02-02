const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require("../controllers/doctorCtrl");

const router = express.Router();

// POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);

// POST UPDATE PROFILE DOC INFO
router.post("/updateProfile", authMiddleware, updateProfileController);

// GET SINGLE DOCTOR INFORMATION
router.post("/getDoctorById", authMiddleware, getDoctorByIdController);

// GET DOCTOR APPOINTMENTS
router.get(
  "/doctor-appointments",
  authMiddleware,
  doctorAppointmentsController
);

// POST UPDATE STATUS INFORMATION
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
