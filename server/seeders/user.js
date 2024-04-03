import { User } from "../models/userModel.js";
import { Chat } from "../models/chatModel.js";
import { faker, simpleFaker } from "@faker-js/faker";
import { Message } from "../models/messageModel.js";

const createUser = async (numUsers) => {
  try {
    const usersPromise = [];
    for (let i = 0; i < numUsers; i++) {
      const tempuser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        password: "password",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      usersPromise.push(tempuser);
    }
    await Promise.all(usersPromise);
    console.log("users created", numUsers);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const createSingleChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }
    await Promise.all(chatsPromise);
    console.log("Chats created SuccessFully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const createGroupChats = async (numChats) => {
  try {
    const users = await User.find().select("_id");
    const chatsPromise = [];
    for (let i = 0; i < numChats; i++) {
      const numMembers = simpleFaker.number.int({
        min: 3,
        max: users.length,
      });
      const members = [];
      for (let i = 0; i < numMembers; i++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];
        if (!members.includes(randomUser)) {
          members.push(randomUser);
        }
      }
      const chat = Chat.create({
        groupChat: true,
        name: faker.lorem.words(1),
        members,
        creator: members[0],
      });
      chatsPromise.push(chat);
    }
    await Promise.all(chatsPromise);
    console.log("Chats created SuccessFully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessage = async (numMessages) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");
    const messagePromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomChat = chats[Math.floor(Math.random() * chats.length)];

      messagePromise.push(
        Message.create({
          chat: randomChat,
          sender: randomUser,
          content: faker.lorem.sentence(),
        })
      );
    }
    await Promise.all(messagePromise);
    console.log("message created");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessageInChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");
    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randomuser = users[Math.floor(Math.random() * users.length)];
      messagesPromise.push(
        Message.create({
          chat: chatId,
          sender: randomuser,
          content: faker.lorem.sentence(),
        })
      );
    }
    await Promise.all(messagesPromise);
    console.log("message created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export {
  createUser,
  createSingleChats,
  createGroupChats,
  createMessage,
  createMessageInChat,
};
