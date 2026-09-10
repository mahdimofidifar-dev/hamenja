import mongoose from "mongoose";

const businessModel = new mongoose.Schema({
  businessName: {
    type: String,
  },
  category: {},
  description: {},
  businessPhone: {
    type: String,
  },
  province: { type: String },
  city: { type: String },
  neighborhood: { type: String },
  address: { type: String },
  sanes: {},
  workingDay: { type: String },
  media: {
    cover: { type: String },
    album: { type: String },
  },
});
const Business = mongoose.model("Business", businessModel);
export default Business;
