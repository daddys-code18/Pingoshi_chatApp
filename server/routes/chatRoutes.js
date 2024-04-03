import express from "express";

import {
  attachmentMulter,
  multerUpload,
  singleAvatar,
} from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChat,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  renameGroup,
  removeMembers,
  sendAttachments,
} from "../controllers/chatController.js";
import {
  addMembervalidator,
  chatIdvalidator,
  getMessagevalidator,
  leaveGroupvalidator,
  newGroupvalidator,
  removeMembervalidator,
  renamevalidator,
  sendAttachmentsvalidator,
  validatehandler,
} from "../lib/validators.js";
const app = express.Router();
app.use(isAuthenticated);
app.post("/new", newGroupvalidator(), validatehandler, newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroups);
app.put("/addmembers", addMembervalidator(), validatehandler, addMembers);
app.put(
  "/removemember",
  removeMembervalidator(),
  validatehandler,
  removeMembers
);
app.delete("/leave/:id", leaveGroupvalidator(), validatehandler, leaveGroup);
app.post(
  "/message",
  attachmentMulter,
  sendAttachmentsvalidator(),
  validatehandler,
  sendAttachments
);

//get Message
app.get("/message/:id", getMessagevalidator(), validatehandler, getMessages);

// get Chat Details Rename,delete
app
  .route("/:id")
  .get(chatIdvalidator(), validatehandler, getChatDetails)
  .put(renamevalidator(), validatehandler, renameGroup)
  .delete(chatIdvalidator(), validatehandler, deleteChat);

export default app;
