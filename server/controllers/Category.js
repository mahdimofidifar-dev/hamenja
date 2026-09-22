import Category from "../models/Category.js";
import Business from "../models/Business.js";
export const getCategory = async (req, res) => {
  const { uniqName } = req.params;
  try {
    const data = await Category.findOne({ uniqName });
    res.status(200).json(data);
  } catch (error) {}
};
export const addCategory = async (req, res) => {
  const { title, uniqName } = req.body;
  //   const businesses = await Business.find({ category: uniqName });
  try {
    await Category.create({ title, uniqName });
    res.json("sakht");
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {}
};
