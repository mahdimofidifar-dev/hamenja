import Business from "../models/Business.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
export const addBusiness = async (req, res) => {
  try {
    const {
      title,
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
      is24Hours,
      openTime,
      closeTime,
      ownerId,
      uniqName,
    } = req.body;

    const categories = Array.isArray(req.body.categories)
      ? req.body.categories
      : req.body.categories
        ? [req.body.categories]
        : [];

    const amenities = Array.isArray(req.body.amenities)
      ? req.body.amenities
      : req.body.amenities
        ? [req.body.amenities]
        : [];

    const workingDays = Array.isArray(req.body.workingDays)
      ? req.body.workingDays
      : req.body.workingDays
        ? [req.body.workingDays]
        : [];

    // Logo
    if (!req.files?.logo?.[0]) {
      return res.status(400).json({
        message: "Logo is required",
      });
    }

    const logo = `/uploads/businesses/${req.files.logo[0].filename}`;

    // Gallery
    const gallery =
      req.files?.gallery?.map(
        (file) => `/uploads/businesses/${file.filename}`,
      ) || [];

    const business = await Business.create({
      title,
      categories,
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
      workingDays,
      logo,
      gallery,
      uniqName,
      ownerId,
    });

    return res.status(201).json({
      message: "Business added successfully",
      business,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
export const uploadImg = async (req, res) => {};
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
  const comments = await Comment.find({ businessId: business._id })
    .select("userId rate comment")
    .populate("userId", "name lastName , avatar");

  const data = {
    ...business.toObject(),
    comments,
  };
  res.json(data);
};

export const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  await Business.findByIdAndDelete(id);
  res.status(204).json({ message: "business deleted successfully" });
};
