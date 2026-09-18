import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
  comment: {
    type: String,
  },

  rate: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Business",
    required: true,
  },
});

const Comment = mongoose.model("comment", commentModel);

export default Comment;