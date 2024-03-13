import { User } from "../models/userModel.js";
import { sendToken } from "../utils/features.js";

export const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "sfsdfs",
    url: "cccc",
  };
  const user = await User.create({ name, password, username, avatar, bio });

  sendToken(res, user, 201, "User created");
};

export const login = (req, res) => {
  res.send("hello");
};
