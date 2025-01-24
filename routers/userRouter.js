const userRouter = require("express").Router();
const { createUser, loginUser } = require("../controllers/authController");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
// const checkBody = require("../validators/checkBody");
// const validate = require("../validators/validate");

userRouter.route("/").get(getAllUsers).post(createUser);

userRouter.route("/login").post(loginUser);

userRouter.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = userRouter;
