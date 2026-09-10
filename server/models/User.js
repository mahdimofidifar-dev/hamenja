import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "نام الزامی است"],
      trim: true,
      minLength: 2,
    },
    phone: {
      type: String,
      required: [true, "شماره تماس الزامی است"],
      // unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["client", "provider", "admin"],
      default: "client",
    },
    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.model("User", userSchema);
export default User;