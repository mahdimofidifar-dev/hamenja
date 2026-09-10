import e from "express";
import { getUsers, getUser, deleteUser, auth } from "../controllers/User.js";
const userRouter = e.Router();
userRouter.route("/").get(getUsers).post(auth);
userRouter.route("/:id").get(getUser).delete(deleteUser);
export default userRouter;
