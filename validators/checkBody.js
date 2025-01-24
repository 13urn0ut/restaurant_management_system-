const { body, checkExact } = require("express-validator");
const argon2 = require("argon2");
const { getUserByEmail, getUsersPassword } = require("../models/userModel");

exports.validateLogin = [
  body("email").isEmail().withMessage("Email is required").normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      const user = await getUserByEmail(req.body.email);

      if (!user) throw new Error("User not found");

      const { password: usersPassword } = await getUsersPassword(user.id);

      const isPasswordCorrect = await argon2.verify(usersPassword, password);

      if (!isPasswordCorrect) throw new Error("Incorrect email or password");

      return true;
    }),

  checkExact([], { message: "Invalid fields" }),
];

exports.validateSignup = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Email is required")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await getUserByEmail(email);

      if (user) throw new Error("Email already in use");

      return true;
    }),

  body("phoneNumber").trim().notEmpty().withMessage("Phone number is required"),

  body("address").trim().notEmpty().withMessage("Address is required"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  checkExact([], { message: "Invalid fields" }),
];

exports.validateUpdateUser = [
  body("name").trim().optional().notEmpty().withMessage("Name is required"),

  body("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Email is required")
    .normalizeEmail()
    .custom(async (email) => {
      const user = await getUserByEmail(email);

      if (user) throw new Error("Email already in use");

      return true;
    }),

  body("phoneNumber")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Phone number is required"),

  body("address")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Address is required"),

  checkExact([], { message: "Invalid fields" }),
];

exports.validateCreateOrder = [
  body("total").trim().notEmpty().withMessage("Total is required"),

  checkExact([], { message: "Invalid fields" }),
];

exports.validateUpdateOrder = [
  body("status_id")
    .trim()
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Status id must be between 1 and 5"),

  body("total").trim().optional().notEmpty().withMessage("Total is required"),

  checkExact([], { message: "Invalid fields" }),
];

exports.validateCreateMenuItem = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("description")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .trim()
    .isCurrency({
      allow_negatives: false,
      decimal_digits: [0, 1, 2],
    })
    .withMessage("Price is required"),

  body("category_id")
    .isInt({ min: 1, max: 3 })
    .withMessage("Category id must be between 1 and 3"),

  checkExact([], { message: "Invalid fields" }),
];

exports.validateUpdateMenuItem = [
  body("name").trim().optional().notEmpty().withMessage("Name is required"),

  body("description")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .trim()
    .optional()
    .isCurrency({
      allow_negatives: false,
      decimal_digits: [0, 1, 2],
    })
    .withMessage("Price is required"),

  body("category_id")
    .optional()
    .isInt({ min: 1, max: 3 })
    .withMessage("Category id is required"),

  checkExact([], { message: "Invalid fields" }),
];
