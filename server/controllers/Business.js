import Business from "../models/Business.js";
const addBusiness = async (req, res) => {
  const {
    title,
    category,
    description,
    mobile,
    phone,
    instagram,
    website,
    province,
    city,
    neighborhood,
    address,
    latitude,
    longitude,
    amenities,
    is24Hours,
    openTime,
    closeTime,
    workingDay,
    coverImage,
    gallery,
    uniqName,
  } = req.body;
  // console.log(title);
  await Business.create({
    title,
    category,
    description,
    mobile,
    phone,
    instagram,
    website,
    province,
    city,
    neighborhood,
    address,
    latitude,
    longitude,
    amenities,
    is24Hours,
    openTime,
    closeTime,
    workingDay,
    coverImage,
    gallery,
    uniqName,
  });
  console.log("sakt");
  try {
    res.json({ message: "business added successfully" });
  } catch (error) {
    res.json({ message: error });
  }
};
const updateBusiness = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    await Business.findByIdAndUpdate(id, update);
    res.json({ message: "business edited successfully" });
  } catch (error) {
    res.json({ message: error });
  }
};
const getAllBusiness = async (req, res) => {
  const allBusiness = await Business.find({});
  res.json(allBusiness);
};
const getOneBusiness = async (req, res) => {
  const { uniqName } = req.params;
  const business = await Business.findOne({ uniqName });
  res.json(business);
};
export { addBusiness, updateBusiness, getAllBusiness, getOneBusiness };
