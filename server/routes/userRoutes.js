import express from "express";
import { login } from "../controllers/userController.js";

const app = express.Router();

app.get("/login", login);

export default app;
