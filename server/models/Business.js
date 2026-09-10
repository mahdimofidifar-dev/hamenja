import mongoose from "mongoose";

const businessModel = new mongoose.Schema({
  title: { type: String },
  category: {},
  description: {},
  mobile: { type: String },
  phone: { type: String },
  instagram: {},
  website: {},
  province: { type: String },
  city: { type: String },
  neighborhood: { type: String },
  address: { type: String },
  latitude: {},
  longitude: {},
  amenities: {},
  is24Hours: { type: Boolean },
  openTime: {},
  closeTime: {},
  workingDay: { type: String },
  coverImage: { type: String },
  gallery: { type: Array },
  sanes: {},
  uniqName:{}
});
const Business = mongoose.model("business", businessModel);
export default Business;
