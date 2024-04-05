// import { Promise } from "mongoose";:
import { TryCatch } from "../middleware/errorMiddleware.js";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";

const allUser = TryCatch(async (req, res, next) => {
  const users = await User.find({});

  const transformedusers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);
      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    })
  );

  return res.status(200).json({
    status: "Success",
    users: transformedusers,
  });
});

const allChats = TryCatch(async (req, res, next) => {});
export { allUser, allChats };
