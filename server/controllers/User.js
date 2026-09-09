import User from "../models/User.js";
const userController = async (req, res) => {
  res.json({ message: "hello" });
};
const opt = "1213";

const auth = async (req, res) => {
  const { phone, optCode } = req.body;

  const findUser = await User.findOne({ phone });
  if (!findUser) {
    await User.create({ phone });
    res.json({ message: "user created successfully" });
  }
  optCode === opt
    ? res.json({ message: "login" })
    : res.json({ message: "opt wrong" });
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {}
};
const getUser = async (req, res) => {
  const Id = req.params.id;
  try {
    const user = await User.findOne({ Id });
    // res.json(user);
    res.status(200).json({ success: true, count: user.length, data: user });
  } catch (error) {}
};
const deleteUser = async (req, res) => {
  const Id = req.params.id;
  try {
    const user = await User.findOneAndDelete({ Id });
    res.json({ message: "user deleted" });
    console.log(user);
  } catch (error) {}
};

export { getUsers, getUser, deleteUser, auth };
