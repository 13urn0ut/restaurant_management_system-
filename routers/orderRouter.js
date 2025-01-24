const orderRouter = require("express").Router();
const {
  createOrder,
  getUsersOrders,
  getUsersOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// orderRouter.route("/").post(createOrder);

orderRouter.route("/user/:userId").get(getUsersOrders).post(createOrder);

orderRouter.route("/:orderId").put(updateOrder);

orderRouter
  .route("/:orderId/user/:userId")
  .get(getUsersOrderById)
  .delete(deleteOrder);

module.exports = orderRouter;
