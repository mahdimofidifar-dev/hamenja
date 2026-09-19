import e from "express";

import { addComment } from "../controllers/Comment.js";
import authenticate from "../middlewares/authenticate.js";
const commentRouter = e.Router();
commentRouter
  .route("/")
  .post(authenticate, addComment)
  .get(async (req, res) => {});
export default commentRouter;
