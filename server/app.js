import express, { urlencoded } from "express";
import userRoute from "./routes/userRoutes.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const app = express();

// Using Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello World");
});
app.use(errorMiddleware);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
