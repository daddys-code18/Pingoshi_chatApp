import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";
const registervalidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter username").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
];

const validatehandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessage = errors
    .array()
    .map((error) => error.msg)
    .join(", ");
  console.log(errorMessage);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessage, 400));
};

export { registervalidator, validatehandler };
