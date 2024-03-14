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

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", isAuthenticated, logout);
app.get("/search", isAuthenticated, searchUser);

export default app;
