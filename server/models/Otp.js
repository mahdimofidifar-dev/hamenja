import mongoose from "mongoose";
import { timeStamp } from "node:console";
import { type } from "node:os";
const otpSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timeStamp: true },
);
otpSchema.index({ expiresAt: 1 }, { expiresAfterScends: 0 });
const OTP = mongoose.model("OTP", otpSchema);
export default OTP;
