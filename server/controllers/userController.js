import { compare } from "bcrypt";
import { User } from "../models/userModel.js";
import { emitEvent, sendToken } from "../utils/features.js";
import { TryCatch } from "../middleware/errorMiddleware.js";
import { ErrorHandler } from "../utils/utility.js";
import { cookieOptions } from "../utils/features.js";
import { Chat } from "./../models/chatModel.js";
import { Request } from "./../models/requestModel.js";
import { NEW_REQUEST, REFETCH_CHATS } from "../constants/event.js";
import { getOtherMember } from "../lib/helper.js";

export const newUser = TryCatch(async (req, res, next) => {
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

export const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user) return next(new ErrorHandler("User not found", 404));
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

export const searchUser = TryCatch(async (req, res, next) => {
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

export const sendFriendRequest = TryCatch(async (req, res, next) => {
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

export const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { accept, requestId } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  // console.log(request);
  if (!request) return next(new ErrorHandler("Request not Found", 404));

  if (request.receiver._id.toString() !== req.user.toString())
    return next(
      new ErrorHandler("You are not authorized to accept this request", 401)
    );

  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Friend Request Rejected",
    });
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({
      members,
      name: `${request.sender.name}-${request.receiver.name}`,
    }),
    request.deleteOne(),
  ]);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(200).json({
    success: true,
    message: "Friend Request Accepted",
    senderId: request.sender._id,
  });
});

export const getMyNotiications = TryCatch(async (req, res, next) => {
  const requests = await Request.find({ receiver: req.user }).populate(
    "sender",
    "name avatar"
  );
  const allRequests = requests.map(({ _id, sender }) => ({
    _id,
    sender: {
      _id: sender._id,
      name: sender.name,
      avatar: sender.avatar.url,
    },
  }));
  return res.status(200).json({
    success: true,
    allRequests,
  });
});

export const getMyFriends = TryCatch(async (req, res, next) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({
    members: req.user,
    groupChat: false,
  }).populate("members", "name avatar");

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user);
    return {
      _id: otherUser._id,
      name: otherUser.name,
      avatar: otherUser.avatar.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);

    const availableFriends = friends.filter(
      (friend) => !chat.members.includes(friend._id)
    );
    return res.status(200).json({
      success: true,
      friends: availableFriends,
    });
  } else {
    return res.status(200).json({
      success: true,

      friends,
    });
  }
});
