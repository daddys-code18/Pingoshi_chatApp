import express, { urlencoded } from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import chatRoute from "./routes/chatRoutes.js";
import adminRoute from "./routes/adminRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";
// import { createMessageInChat } from "./seeders/chat.js";
// import {
//   createGroupChats,
//   createSingleChats,
//   createUser,
// } from "./seeders/user.js";

dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
export const adminSecretKey = process.env.ADMIN_SECRET_KEY || "PavanKafare";
export const envMode = process.env.NODE_ENV.trim() || "PRODUCTION";

connectDB(mongoURI);
// createUser(10);
// createSingleChats(10);
// createGroupChats(10);
// createMessageInChat("660d69f2f96566466988b109", 50);

const app = express();
const server = createServer(app);
const io = new Server(server, {});

// Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("hello World");
});

io.on("connection", (socket) => {
  console.log(" A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log(" User Discount ");
  });
});

app.use(errorMiddleware);
server.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} in ${envMode} Mode`
  );
});
