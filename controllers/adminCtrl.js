const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");

const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};

const getAllDoctorsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "doctors data",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching doctors",
      error,
    });
  }
};

// doctor account status
const changeAccountStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;

    // Update the status of the doctor
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "Doctor not found",
      });
    }

    // Find the associated user
    const user = await userModel.findOne({ _id: doctor.userId });

    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found for the given doctor",
      });
    }

    // Update user's notification
    const notification = {
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request has ${status} status`,
      onClickPath: "/notification",
    };
    user.notification.push(notification);

    // Update isDoctor field based on the status
    user.isDoctor = status === "approved";

    // Save the user changes
    await user.save();

    // Send response
    res.status(201).send({
      success: true,
      message: "Account status updated successfully",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Account Status",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsersController,
  getAllDoctorsController,
  changeAccountStatus,
};
