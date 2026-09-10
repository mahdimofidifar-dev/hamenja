import e from "express";
import { getUsers, getUser, deleteUser, login } from "../controllers/User.js";
const userRouter = e.Router();
userRouter.route("/").get(getUsers).post(login);
userRouter.route("/:id").get(getUser).delete(deleteUser);
export default userRouter;
