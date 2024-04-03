import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import { emitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middleware/errorMiddleware.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";
import { Chat } from "./../models/chatModel.js";
import { Request } from "./../models/requestModel.js";
import { NEW_REQUEST } from "../constants/event.js";

export const newUser = TryCatch(async (req, res) => {
  const { name, username, password, bio } = req.body;
  const avatar = {
    public_id: "sfsdfs",
    url: "cccc",
  };
  const user = await User.create({ name, password, username, avatar, bio });

  sendToken(res, user, 201, "User created");
});

export const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid UserName or Password", 404));

  const isMatch = await compare(password, user.password);
  if (!isMatch)
    return next(new ErrorHandler("Invalid UserName or Password", 404));
  sendToken(res, user, 200, `Welcome ${user.username}`);
});

export const getMyProfile = TryCatch(async (req, res) => {
  const user = await User.findById(req.user);
  res.status(200).json({
    success: true,
    user,
  });
});
export const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("chat-App", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const searchUser = TryCatch(async (req, res) => {
  const { name = "" } = req.query;
  // Finding All My Chats
  const myChats = await Chat.find({ groupChat: false, members: req.user });
  // extracting all Users From chats means friend aor people i have chatted with /
  const allUsersFromMyChats = myChats.flatMap((chat) => chat.members);

  // Finding all Users except me and my Friends
  const allUsersExceptMeAndFriends = await User.find({
    _id: { $nin: allUsersFromMyChats },
    name: { $regex: name, $options: "i" },
  });
  // modifying the response
  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  return res.status(200).json({
    success: true,
    users,
  });
});

export const sendFriendRequest = TryCatch(async (req, res) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      {
        sender: req.user,
        receiver: userId,
      },
      {
        sender: userId,
        receiver: req.user,
      },
    ],
  });
  if (request) return next(new ErrorHandler("request already sent", 400));
  await Request.create({
    sender: req.user,
    receiver: userId,
  });

  emitEvent(req, NEW_REQUEST, [userId]);
  return res.status(200).json({
    success: true,
    message: "Friend Request Sent",
  });
});
