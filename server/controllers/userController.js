import { User } from "../models/userModel.js";

export const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "sfsdfs",
    url: "cccc",
  };
  await User.create({ name, password, username, avatar, bio });
  res.status(201).json({
    message: "User created Successfully",
  });
};

export const login = (req, res) => {
  res.send("hello");
};
