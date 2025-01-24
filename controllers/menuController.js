const {
  getAllMenu,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../models/menuModel");
const AppError = require("../utils/appError");

exports.getAllMenu = async (req, res, next) => {
  try {
    const menu = await getAllMenu();

    if (!menu || menu.length === 0) throw new AppError("No menu found", 404);

    res.status(200).json({
      status: "success",
      data: menu,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await getMenuItemById(req.params.id);

    if (!menuItem) throw new AppError("Menu item not found", 404);

    res.status(200).json({
      status: "success",
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await createMenuItem({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    });

    if (!menuItem) throw new AppError("Menu item creation failed", 500);

    res.status(201).json({
      status: "success",
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await updateMenuItem(req.params.id, {
      ...req.body,
      updated_at: new Date(),
    });

    if (!menuItem) throw new AppError("Menu item not found", 404);

    res.status(200).json({
      status: "success",
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const menuItem = await deleteMenuItem(req.params.id);

    if (!menuItem) throw new AppError("Menu item not found", 404);

    res.status(200).json({
      status: "success",
      data: menuItem,
    });
  } catch (err) {
    next(err);
  }
};
