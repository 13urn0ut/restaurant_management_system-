const menuRouter = require("express").Router();
const { protect, allowAccessTo } = require("../controllers/authController");
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
  .post(
    protect,
    allowAccessTo("admin"),
    validateCreateMenuItem,
    validate,
    createMenuItem
  );

menuRouter
  .route("/:id")
  .all(checkParamsId, validate)
  .get(getMenuItemById)
  .put(
    protect,
    allowAccessTo("admin"),
    validateUpdateMenuItem,
    validate,
    updateMenuItem
  )
  .delete(protect, allowAccessTo("admin"), deleteMenuItem);

module.exports = menuRouter;
