// import { Promise } from "mongoose";:
import { TryCatch } from "../middleware/errorMiddleware.js";
import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { Message } from "./../models/messageModel.js";

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

const allChats = TryCatch(async (req, res, next) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessage = await Message.countDocuments({ chat: _id });
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map((member) => member.avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMessage: members.length,
      };
    })
  );

  return res.status(200).json({
    status: "success",
    chats: transformedChats,
  });
});

const allMessage = TryCatch(async (req, res, next) => {
  const message = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessage = message.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => ({
      _id,
      attachments,
      content,
      createdAt,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    })
  );

  return res.status(200).json({
    status: "success",
    message: transformedMessage,
  });
});

const getDashBoardStats = TryCatch(async (req, res, next) => {
  const [groupCount, userCount, messageCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7daysMessage = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  const dayInMiliseconds = 1000 * 60 * 60 * 24;

  last7daysMessage.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / dayInMiliseconds;

    const index = Math.floor(indexApprox);
    message[6 - index]++;
  });

  const stats = {
    groupCount,
    userCount,
    messageCount,
    totalChatsCount,
    messagesChats: messages,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});
export { allUser, allChats, allMessage, getDashBoardStats };
