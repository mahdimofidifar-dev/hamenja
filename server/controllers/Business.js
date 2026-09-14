import Business from "../models/Business.js";
export const addBusiness = async (req, res) => {
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
    ownerId,
  } = req.body;
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
    ownerId,
  });
  try {
    res.json({ message: "business added successfully" });
  } catch (error) {
    res.json({ message: error });
  }
};
export const updateBusiness = async (req, res) => {
  const id = req.params.id;
  const update = req.body;
  try {
    await Business.findByIdAndUpdate(id, update);
    res.json({ message: "business edited successfully" });
  } catch (error) {
    res.json({ message: error });
  }
};
export const getAllBusiness = async (req, res) => {
  const allBusiness = await Business.find({});
  res.json(allBusiness);
};
export const getOneBusiness = async (req, res) => {
  const { uniqName } = req.params;
  const business = await Business.findOne({ uniqName });
  res.json(business);
};
