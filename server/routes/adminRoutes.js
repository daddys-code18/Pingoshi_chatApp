import express from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessage,
  allUser,
  getAdminData,
  getDashBoardStats,
} from "../controllers/adminController.js";
import { adminLoginvalidator, validatehandler } from "../lib/validators.js";
import { isAdmin } from "../middleware/auth.js";
const app = express.Router();

app.post("/verify", adminLoginvalidator(), validatehandler, adminLogin);
app.get("/logout", adminLogout);

app.use(isAdmin);
app.get("/", getAdminData);

app.get("/users", allUser);
app.get("/chats", allChats);
app.get("/messages", allMessage);
app.get("/stats", getDashBoardStats);

export default app;
