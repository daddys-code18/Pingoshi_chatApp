import express from "express";
import {
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
} from "../controllers/userController.js";
import { multerUpload, singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import {
  loginvalidator,
  registervalidator,
  validatehandler,
} from "../lib/validators.js";

const app = express.Router();

app.post("/new", singleAvatar, registervalidator(), validatehandler, newUser);
app.post("/login", loginvalidator(), validatehandler, login);

app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", isAuthenticated, logout);
app.get("/search", isAuthenticated, searchUser);

export default app;
