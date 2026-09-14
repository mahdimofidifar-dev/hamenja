import e from "express";
import {
  getUsers,
  getUser,
  deleteUser,
  auth,
  requestOtp,
  checkOtp,
  refreshAccessToken,
  logout,
  me,
  signIn,
} from "../controllers/User.js";
import authenticate from "../middlewares/authenticate.js";

const userRouter = e.Router();
userRouter.route("/").get(getUsers).post(auth);
userRouter.route("/me").get(authenticate, me);
userRouter.route("/refresh").post(refreshAccessToken);
userRouter.route("/logout").post(logout);
userRouter.route("/auth/request-otp").post(requestOtp);
userRouter.route("/auth/check-otp").post(checkOtp);
userRouter.route("/auth/sign-in").post(signIn);
userRouter.route("/:id").get(getUser).delete(deleteUser);
export default userRouter;
