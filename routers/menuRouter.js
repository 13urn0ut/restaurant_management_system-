const menuRouter = require("express").Router();
const {
  getAllMenu,
  createMenuItem,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

menuRouter.route("/").get(getAllMenu).post(createMenuItem);

menuRouter
  .route("/:id")
  .get(getMenuItemById)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

module.exports = menuRouter;
