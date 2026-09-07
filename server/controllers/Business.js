import Business from "../models/Business.js";
const addBusiness = async (req, res) => {
  const {
    businessName,
    category,
    description,
    businessPhone,
    province,
    city,
    neighborhood,
    address,
    workingTime,
    workingDay,
    media,
  } = req.body;
  try {
    await Business.create({
      businessName,
      category,
      description,
      businessPhone,
      province,
      city,
      neighborhood,
      address,
      workingTime,
      workingDay,
      media,
    });
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
export { addBusiness, updateBusiness ,getAllBusiness};
