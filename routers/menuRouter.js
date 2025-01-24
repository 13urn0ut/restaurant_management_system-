const menuRouter = require("express").Router();
const {
  getAllMenu,
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const {
  validateUpdateMenuItem,
  validateCreateMenuItem,
} = require("../validators/checkBody");
const { checkParamsId } = require("../validators/checkParams");
const { validate } = require("../validators/validate");

menuRouter
  .route("/")
  .get(getAllMenu)
  .post(validateCreateMenuItem, validate, createMenuItem);

menuRouter
  .route("/:id")
  .all(checkParamsId, validate)
  .get(getMenuItemById)
  .put(validateUpdateMenuItem, validate, updateMenuItem)
  .delete(deleteMenuItem);

module.exports = menuRouter;
