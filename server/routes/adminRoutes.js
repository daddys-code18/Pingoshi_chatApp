import express from "express";
import {
  allChats,
  allMessage,
  allUser,
} from "../controllers/adminController.js";
const app = express.Router();

app.get("/");
app.post("/verify");
app.get("/logout");
app.get("/users", allUser);
app.get("/chats", allChats);
app.get("/messages", allMessage);
app.get("/stats");

export default app;
