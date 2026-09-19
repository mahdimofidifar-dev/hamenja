import User from "../models/User.js";
import Business from "../models/Business.js";

import OTP from "../models/Otp.js";
import bcrypt from "bcrypt";
import { randomInt } from "crypto";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import "dotenv/config";

const userController = async (req, res) => {
  res.json({ message: "hello" });
};
export const requestOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = randomInt(1000, 10000).toString();
  console.log(otp);
  const otpHash = await bcrypt.hash(otp, 10);
  await OTP.create({
    phone,
    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
    otpHash,
  });
  res.json("otp created ");
};
export const checkOtp = async (req, res) => {
  try {
    let isNewUser;
    const { phone, otpCode } = req.body;

    if (!phone || !otpCode) {
      return res.status(400).json({
        message: "Phone and OTP are required",
      });
    }

    const otpUser = await OTP.findOne({ phone });

    if (!otpUser) {
      return res.status(400).json({
        message: "OTP not found or expired",
      });
    }

    if (otpUser.expiresAt < new Date()) {
      await OTP.deleteOne({ _id: otpUser._id });

      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (otpUser === null) {
      return res.status(400).json("otp is wrong");
    }

    const { otpHash } = otpUser;
    const isValid = await bcrypt.compare(otpCode, otpHash);

    if (!isValid) {
      otpUser.attempts += 1;
      await otpUser.save();

      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    let user = await User.findOne({ phone });

    if (!user) {
      isNewUser = true;
      return res.status(200).json({
        message: "کد ورود درست است",
        isNewUser,
      });
    }
    await OTP.deleteOne({ _id: otpUser._id });

    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ userId: user._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "با موفقیت وارد شدید",
      accessToken,
      isNewUser,
      user,
    });
  } catch (error) {
    console.error(error);
  }
  return res.status(500).json({
    message: "Internal server error",
  });
};
export const signIn = async (req, res) => {
  try {
    const { name, lastName, phone, otpCode } = req.body;
    const otpUser = await OTP.findOne({ phone });
    if (!otpCode === otpUser) {
      res.status(402).json({ message: "کد تایید اشتباه است" });
    }
    const user = await User.create({ name, lastName, phone });
    const accessToken = generateAccessToken({
      userId: user._id,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({ userId: user._id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "با موفقیت وارد شدید",
      accessToken,
      user,
    });
  } catch (err) {
    console.error(err);
  }
};
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return res.status(200).json({
      accessToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
};
export const logout = async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};
export const auth = async (req, res) => {
  const { phone, optCode } = req.body;

  let isLogin = false;
  const otpUser = await OTP.findOne({ phone });

  const findUser = await User.findOne({ phone });
  if (!findUser && optCode === otpUser) {
    isLogin = false;
    await User.create({ phone });
    res.json({ message: "user created successfully" });
  } else {
    isLogin = true;
  }
  optCode === otpUser
    ? res.status(201).json({ message: "login" })
    : res.status(401).json({ message: "otp wrong" });
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {}
};
export const me = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId).populate("business");
  res.status(201).json({
    message: "You are authenticated",
    user,
  });
};
export const getUser = async (req, res) => {
  const Id = req.params.id;
  try {
    const user = await User.findOne({ Id });
    // res.json(user);
    res.status(200).json({ success: true, count: user.length, data: user });
  } catch (error) {}
};
export const deleteUser = async (req, res) => {
  const Id = req.params.id;
  try {
    await User.findOneAndDelete({ Id });
    res.json({ message: "user deleted" });
  } catch (error) {}
};
