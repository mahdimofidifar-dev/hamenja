import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "نام الزامی است"],
      trim: true,
      minLength: 2,
    },
    lastName: {
      type: String,
      // required: [true, "نام الزامی است"],
      trim: true,
      minLength: 2,
    },
    phone: {
      type: String,
      // required: [true, "شماره تماس الزامی است"],
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strictPopulate: false,
  },
);
userSchema.virtual("business", {
  ref: "business",
  localField: "_id",
  foreignField: "ownerId",
});
const User = mongoose.model("User", userSchema);
export default User;
