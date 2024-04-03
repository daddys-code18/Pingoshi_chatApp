import express from "express";

import {
  attachmentMulter,
  multerUpload,
  singleAvatar,
} from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addMembers,
  getChatDetails,
  getMyChat,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  remaneGroup,
  removeMembers,
  sendAttachments,
} from "../controllers/chatController.js";
const app = express.Router();
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChat);
app.get("/groups", getMyGroups);
app.put("/addmembers", addMembers);
app.put("/removemember", removeMembers);
app.delete("/leave/:id", leaveGroup);
app.post("/message", attachmentMulter, sendAttachments);

app.route("/:id").get(getChatDetails).put(remaneGroup).delete();

export default app;
