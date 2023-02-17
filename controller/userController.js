import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/jwtToken.js"
export const registerUser = asyncHandler(async (req, res) => {
  const email = req.body.email;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error(`User ${email} already exists`);
  }
  const user = await User.create(req.body);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("failed to create user");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("invalid Emali or password");
  }
});
