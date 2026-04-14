const { body } = require("express-validator");

const loginValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^\S+$/)
    .withMessage("Username must not contain spaces")
    .isLength({ min: 5, max: 10 })
    .withMessage("Username must be between 5 and 10 characters"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long"),
];

const userValidation = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Fullname is required")
    .matches(/^\S+$/)
    .withMessage("Fullname must not conatain spaces")
    .isLength({ min: 5, max: 15 })
    .withMessage("Fullname must be 5 to 15 characters long"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .matches(/^\S+$/)
    .withMessage("Username must not conatain spaces")
    .isLength({ min: 5, max: 15 })
    .withMessage("Username must be 5 to 15 characters long"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["author", "admin"])
    .withMessage("Role must be author or admin"),
];
const userUpdateValidation = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Fullname is required")
    .matches(/^\S+$/)
    .withMessage("Fullname must not conatain spaces")
    .isLength({ min: 5, max: 15 })
    .withMessage("Fullname must be 5 to 15 characters long"),

  body("password")
    .optional({ checkFalsy: true })
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be at least 6 characters long"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["author", "admin"])
    .withMessage("Role must be author or admin"),
];
const categoryValidataion = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be between 3 and 20 characters"),

  body("description")
    .isLength({ max: 100 })
    .withMessage("Description must be at least 6 characters long"),
];
const articleValidataion = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 7, max: 50 })
    .withMessage("Title must be 7 to 50 characters long"),

  body("content")
   .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 50, max: 500 })
    .withMessage("Content must be at least 50 characters long"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
];
const updateCommentValidataion = [
  body("status")
    .trim()
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["pending", "approved", "rejected"])
    .withMessage("Invalid status value")
];
module.exports = {
  loginValidation,
  userValidation,
  userUpdateValidation,
  categoryValidataion,
  articleValidataion,
  updateCommentValidataion
};
