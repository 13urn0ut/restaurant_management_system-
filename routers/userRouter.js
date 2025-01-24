const userRouter = require("express").Router();
const { createUser, loginUser } = require("../controllers/authController");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  validateSignup,
  validateLogin,
  validateUpdateUser,
} = require("../validators/checkBody");

const { checkParamsId } = require("../validators/checkParams");
const { validate } = require("../validators/validate");

userRouter
  .route("/")
  .get(getAllUsers)
  .post(validateSignup, validate, createUser);

userRouter.route("/login").post(validateLogin, validate, loginUser);

userRouter
  .route("/:id")
  .all(checkParamsId, validate)
  .get(getUserById)
  .put(validateUpdateUser, validate, updateUser)
  .delete(deleteUser);

module.exports = userRouter;
