import e from "express";
import {
  addCategory,
  getAllCategories,
  getCategory,
} from "../controllers/Category.js";
const categoryRouter = e.Router();

categoryRouter.route("/:uniqName").get(getCategory);
categoryRouter.route("/").get(getAllCategories).post(addCategory);

export default categoryRouter;
