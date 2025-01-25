const orderRouter = require("express").Router();
const { protect } = require("../controllers/authController");
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
  .post(protect, validateCreateOrder, validate, createOrder);

orderRouter
  .route("/:orderId")
  .all(protect, checkParamsOrderId, validate)
  .put(protect, validateUpdateOrder, validate, updateOrder);

orderRouter
  .route("/:orderId/user/:userId")
  .all(checkParamsUserId, checkParamsOrderId, validate)
  .get(protect, getUsersOrderById)
  .delete(protect, deleteOrder);

module.exports = orderRouter;
