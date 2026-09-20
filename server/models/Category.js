import mongoose from "mongoose";
const category = new mongoose.Schema({
  title: { type: String },
  uniqName: { type: String },
  businesses: [{ type: mongoose.Schema.Types.ObjectId }],
});
const Category = mongoose.model("Category", category);
export default Category;
