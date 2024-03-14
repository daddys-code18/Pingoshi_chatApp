import express from "express";

import { multerUpload, singleAvatar } from "../middleware/multer.js";
import { isAuthenticated } from "../middleware/auth.js";
import { getMyChat, newGroupChat } from "../controllers/chatController.js";
const app = express.Router();
app.use(isAuthenticated);
app.post("/new", newGroupChat);
app.get("/my", getMyChat);

export default app;
