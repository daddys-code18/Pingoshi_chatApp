import express from "express";
import {
  getMyNotiications,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/userController.js";
import { multerUpload, singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  acceptrequestvalidator,
  loginvalidator,
  registervalidator,
  sendFriendrequestvalidator,
  validatehandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registervalidator(), validatehandler, newUser);
app.post("/login", loginvalidator(), validatehandler, login);

app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", isAuthenticated, logout);
app.get("/search", isAuthenticated, searchUser);
app.put(
  "/sendrequest",
  isAuthenticated,
  sendFriendrequestvalidator(),
  validatehandler,
  sendFriendRequest
);
app.put(
  "/acceptrequest",
  isAuthenticated,
  acceptrequestvalidator(),
  validatehandler,
  sendFriendRequest
);
app.get("/notifications", isAuthenticated, getMyNotiications);

export default app;
