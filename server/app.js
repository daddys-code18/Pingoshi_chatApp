import express, { urlencoded } from "express";
import userRoute from "./routes/userRoutes.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});
const mongoURI = process.env.MONGO_URI;
connectDB(mongoURI);

const app = express();

// Using Middleware
app.use(express.json());

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello World");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
