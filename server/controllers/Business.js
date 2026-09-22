import Business from "../models/Business.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
export const addBusiness = async (req, res) => {
  try {
    console.log(req.body);

    const {
      title,
      description,
      mobile,
      phone,
      socialLinks,
      province,
      city,
      neighborhood,
      address,
      latitude,
      longitude,
      amenities,
      is24Hours,
      workingHours,
      ownerId,
      uniqName,
      category,
    } = req.body;

    const parsedCategory = category ? JSON.parse(category) : [];

    const parsedAmenities = amenities ? JSON.parse(amenities) : [];

    const parsedSocialLinks = socialLinks ? JSON.parse(socialLinks) : [];

    const parsedWorkingHours = workingHours ? JSON.parse(workingHours) : {};
    const logoFile = req.files?.logo?.[0];

    // -------------------------
    // Logo
    // -------------------------
    let logo;
    if (logoFile) {
      logo = `/uploads/businesses/${req.files.logo[0].filename}`;
    }

    // -------------------------
    // Gallery
    // -------------------------

    const gallery =
      req.files?.gallery?.map(
        (file) => `/uploads/businesses/${file.filename}`,
      ) || [];

    // -------------------------
    // Create business
    // -------------------------

    const business = await Business.create({
      title,
      description,

      mobile,
      phone,
      socialLinks: parsedSocialLinks,

      province,
      city,
      neighborhood,
      address,

      latitude: Number(latitude),
      longitude: Number(longitude),

      category: parsedCategory,
      amenities: parsedAmenities,

      is24Hours: is24Hours === "true",

      workingHours: parsedWorkingHours,

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
    // console.error("Add business error:", error);

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
export const getBusinessOfCategory = async (req, res) => {
  const { key } = req.params;

  const data = await Business.find({ category: key });
  res.json(data);
};
export const deleteBusiness = async (req, res) => {
  const { id } = req.params;
  await Business.findByIdAndDelete(id);
  res.status(204).json({ message: "business deleted successfully" });
};
