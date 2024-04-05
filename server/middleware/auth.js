import { ErrorHandler } from "../utils/utility.js";
import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies["chat-App"];
  if (!token)
    return next(new ErrorHandler("Please login to access this route", 401));

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decodeData._id;
  next();
};

const isAdmin = (req, res, next) => {
  const token = req.cookies["chattu-admin-token"];
  if (!token)
    return next(new ErrorHandler("Only admin can  access this route", 401));

  const secretKey = jwt.verify(token, process.env.JWT_SECRET);

  const isMatched = secretKey === adminSecretKey;
  if (!isMatched)
    return next(new ErrorHandler("Only admin can  access this route ", 401));

  next();
};

export { isAuthenticated, isAdmin };
