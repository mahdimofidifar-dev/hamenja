import e from "express";
import {
  addBusiness,
  getAllBusiness,
  updateBusiness,
} from "../controllers/Business.js";
const businessRouter = e.Router();
businessRouter.route("/").post(addBusiness).get(getAllBusiness);
businessRouter.route("/:id").put(updateBusiness);
export default businessRouter;
