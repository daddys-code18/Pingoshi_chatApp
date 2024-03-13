import express from "express";
import { getMyProfile, login, newUser } from "../controllers/userController.js";
import { multerUpload, singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

app.get("/me", isAuthenticated, getMyProfile);

export default app;
