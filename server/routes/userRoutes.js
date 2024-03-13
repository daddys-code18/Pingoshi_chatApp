import express from "express";
import { login, newUser } from "../controllers/userController.js";
import { multerUpload, singleAvatar } from "../middleware/multer.js";

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/login", login);

export default app;
