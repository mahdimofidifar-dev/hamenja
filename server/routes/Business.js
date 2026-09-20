import e from "express";
import {
  addBusiness,
  deleteBusiness,
  getAllBusiness,
  getBusinessOfCategory,
  getOneBusiness,
  updateBusiness,
  uploadImg,
} from "../controllers/Business.js";
import upload from "../middlewares/upload.js";
const businessRouter = e.Router();
businessRouter
.route("/")
.post(
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  addBusiness,
)
.get(getAllBusiness);
businessRouter.route("/category/:key").get(getBusinessOfCategory);
businessRouter.route("/:uniqName").get(getOneBusiness);
businessRouter.route("/upload").post(upload.single("image"), uploadImg);
businessRouter.route("/:id").put(updateBusiness).delete(deleteBusiness);
export default businessRouter;
