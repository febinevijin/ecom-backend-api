import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

//get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find().select("-password");
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

// get Single user
export const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//update User
export const updateUser = asyncHandler(async (req, res) => {
  try {
    const id = req.params.userId;
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }).select("-password");
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

// delete user
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId).then((response) => {
      res.status(200).json({
        message: "User deleted successfully",
        success: true,
      });
    });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});
