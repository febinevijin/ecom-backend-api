import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import expressAsyncHandler from "express-async-handler";

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return req.user;
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export const isUser = expressAsyncHandler(async (req, res, next) => {
  try {
    await protect(req, res);
    next();
  } catch (error) {
    throw new Error(error.message);
  }
});
export const isAdmin = expressAsyncHandler(async (req, res, next) => {
  try {
    const data = await protect(req, res);
    if (data.isAdmin === true) {
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
