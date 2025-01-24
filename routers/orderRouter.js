const orderRouter = require("express").Router();
const {
  createOrder,
  getUsersOrders,
  getUsersOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  validateUpdateOrder,
  validateCreateOrder,
} = require("../validators/checkBody");
const {
  checkParamsUserId,
  checkParamsOrderId,
} = require("../validators/checkParams");
const { validate } = require("../validators/validate");

// orderRouter.route("/").post(createOrder);

orderRouter
  .route("/user/:userId")
  .all(checkParamsUserId, validate)
  .get(getUsersOrders)
  .post(validateCreateOrder, validate, createOrder);

orderRouter
  .route("/:orderId")
  .all(checkParamsOrderId, validate)
  .put(validateUpdateOrder, validate, updateOrder);

orderRouter
  .route("/:orderId/user/:userId")
  .all(checkParamsUserId, checkParamsOrderId, validate)
  .get(getUsersOrderById)
  .delete(deleteOrder);

module.exports = orderRouter;
