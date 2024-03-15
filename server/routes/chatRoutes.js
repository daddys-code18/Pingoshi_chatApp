import express from "express";

import { multerUpload, singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addMembers,
  getMyChat,
  getMyGroups,
  newGroupChat,
} from "../controllers/chatController.js";
const app = express.Router();
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChat);
app.get("/groups", getMyGroups);
app.put("/addmembers", addMembers);

export default app;
