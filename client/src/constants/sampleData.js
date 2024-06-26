export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dave Doe",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];
export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dave Doe",
    _id: "2",
  },
];
export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dave Doe",
    },
    _id: "2",
  },
];
export const sampleMessage = [
  {
    attachments: [],
    content: "This is a message with an attachment.",
    _id: "cssdvvsvvsvvv",
    sender: {
      _id: "user._id",
      name: "chaman",
    },

    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630z",
  },
  {
    attachments: [
      {
        public_id: "adadadad",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    _id: "cssdvvsvvsvddvv",
    sender: {
      _id: "cacdcdc",
      name: "chaman",
    },

    chat: "chatId",
    createdAt: "2024-02-12T10:41:30.630z",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "lina",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      username: "lina_doe",
      friends: 20,
      groups: 25,
    },
  ],
  chats: [
    {
      name: "Lansan Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: true,
      members: [
        {
          _id: "1",
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
        {
          _id: "2",
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      username: "john_doe",
      creator: {
        avatar: " https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
    },
    {
      name: "lavdeen Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        {
          _id: "1",
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
        {
          _id: "2",
          avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        },
      ],
      totalMembers: 2,
      totalMessages: 20,
      username: "john_doe",
      creator: {
        avatar: " https://www.w3schools.com/howto/img_avatar.png",
        name: "John Doe",
      },
    },
  ],
  messages: [
    {
      attachments: [],
      content: "hi pavan",
      _id: "svsfvfdvfdvcdc",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "chaman",
      },
      chat: "chatId",
      groupsChat: false,
      createdAt: "2024-02-12T10:41:30.630z",
    },
    {
      attachments: [
        {
          public_id: "adadadad",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "cccc",
      _id: "svsfvfdvfdv",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "chaman 2",
      },
      chat: "chatId",
      groupsChat: true,

      createdAt: "2024-02-12T10:41:30.630z",
    },
  ],
};
