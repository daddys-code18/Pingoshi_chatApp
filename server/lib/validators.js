import { body, validationResult, check, param, query } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";
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

const registervalidator = () => [
  body("name", "Please Enter Name").notEmpty(),
  body("username", "Please Enter username").notEmpty(),
  body("bio", "Please Enter bio").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
  check("avatar", "Please check Avatar").notEmpty(),
];

const loginvalidator = () => [
  body("username", "Please Enter username").notEmpty(),
  body("password", "Please Enter password").notEmpty(),
];

const newGroupvalidator = () => [
  body("name", "Please Enter name").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMembervalidator = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  body("members")
    .notEmpty()
    .withMessage("Please Enter members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMembervalidator = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  body("userId", "Please Enter userId").notEmpty(),
];
const leaveGroupvalidator = () => [
  param("id", "Please Enter chat ID").notEmpty(),
];

const sendAttachmentsvalidator = () => [
  body("chatId", "Please Enter chatId").notEmpty(),
  check("files")
    .notEmpty()
    .withMessage("Please Upload Attachments")
    .isArray({ min: 1, max: 5 })
    .withMessage("Attachments must be 1-5"),
];
const getMessagevalidator = () => [
  param("id", "Please Enter chat ID").notEmpty(),
];
const chatIdvalidator = () => [param("id", "Please Enter chat ID").notEmpty()];
const renamevalidator = () => [
  param("id", "Please Enter chat ID").notEmpty(),
  body("name", "Please Enter New name").notEmpty(),
];
const sendFriendrequestvalidator = () => [
  body("userId", "Please Enter New User Id").notEmpty(),
];

export {
  registervalidator,
  validatehandler,
  loginvalidator,
  newGroupvalidator,
  addMembervalidator,
  removeMembervalidator,
  leaveGroupvalidator,
  sendAttachmentsvalidator,
  getMessagevalidator,
  chatIdvalidator,
  renamevalidator,
  sendFriendrequestvalidator,
};
