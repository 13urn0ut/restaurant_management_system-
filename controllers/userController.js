const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../models/userModel");
const AppError = require("../utils/appError");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    if (!users) throw new AppError("No users found", 404);

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) throw new AppError("User not found", 404);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, {
      ...req.body,
      updated_at: new Date(),
    });

    if (!user) throw new AppError("User not found", 404);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);

    if (!user) throw new AppError("User not found", 404);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
