import e from "express";
import {
  addBusiness,
  getAllBusiness,
  getOneBusiness,
  updateBusiness,
} from "../controllers/Business.js";
const businessRouter = e.Router();
businessRouter.route("/").post(addBusiness).get(getAllBusiness);
businessRouter.route("/:uniqName").get(getOneBusiness);
businessRouter.route("/:id").put(updateBusiness);
export default businessRouter;
