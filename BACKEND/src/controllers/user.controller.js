import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  console.log("Incoming register data:", req.body);

  if (
    [email, name, password].some(
      (field) => typeof field !== "string" || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    name: name,
    email: email,
    password: password,
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password  -refreshToken"
  );
  const accessToken = createdUser.generateAccessToken();

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  const options = {
    httpOnly: true,
    secure: true,
  };
  res.cookie("accessToken", accessToken, options);
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "Invalid user credentials");
  }
  const isPasswordCorrect = user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid user credentials");
  }
  const accessToken = user.generateAccessToken();
  const options = {
    httpOnly: true,
    secure: true,
  };
  const existedUser = await User.findById(user._id).select(
    "-password  -refreshToken"
  );
  res.cookie("accessToken", accessToken, options);
  return res
    .status(200)
    .json(new ApiResponse(200, existedUser, "User LoggedIn successfully"));
});
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

const getStats = asyncHandler(async (req, res) => {
  try {
    
    const userId = req.user._id;
    const stats = await User.aggregate([
      { 
        $match: { 
          _id: userId 
        } 
      },
      {
        $lookup: {
          from: "shorturls",
          localField: "_id",
          foreignField: "user",
          as: "totalUrls",
        },
      },
      {
        $addFields: {
          totalUrls: { $size: "$totalUrls" },
          totalClicks: {
            $sum: "$totalUrls.clicks",
          },
          totalActiveLinks: {}
        },
      },
      {
        $project: {
          name: 1,
          email: 1,
          totalUrls: 1,
          totalClicks: 1,
        },
      },
    ]);

    if (!stats || stats.length === 0) {
      throw new ApiError(404, "User stats not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, stats[0], "Stats fetched successfully"));
    
  } catch (error) {
    throw new ApiError(500, "Error fetching user stats");
  }
});
export { registerUser, loginUser, logoutUser, getCurrentUser, getStats };
