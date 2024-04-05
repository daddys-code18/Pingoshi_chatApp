import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessage,
  allUser,
  getDashBoardStats,
} from "../controllers/adminController.js";
import { adminLoginvalidator, validatehandler } from "../lib/validators.js";
const app = express.Router();

app.get("/");
app.post("/verify", adminLoginvalidator(), validatehandler, adminLogin);
app.get("/logout", adminLogout);
app.get("/users", allUser);
app.get("/chats", allChats);
app.get("/messages", allMessage);
app.get("/stats", getDashBoardStats);

export default app;
