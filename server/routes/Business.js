import e from "express";
import {
  addBusiness,
  deleteBusiness,
  getAllBusiness,
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
businessRouter.route("/upload").post(upload.single("image"), uploadImg);
businessRouter.route("/:uniqName").get(getOneBusiness);
businessRouter.route("/:id").put(updateBusiness).delete(deleteBusiness);
export default businessRouter;
