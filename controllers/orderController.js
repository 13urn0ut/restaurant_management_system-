const {
  createOrder,
  getUsersOrders,
  getUsersOrderById,
  updateOrder,
  deleteUsersOrder,
} = require("../models/orderModel");
const AppError = require("../utils/appError");

exports.createOrder = async (req, res, next) => {
  try {
    const newOrder = {
      customer_id: req.params.userId,
      status_id: 1,
      total: req.body.total,
      order_time: new Date(),
    };

    const order = await createOrder(newOrder);

    if (!order) throw new AppError("Order creation failed", 500);

    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsersOrders = async (req, res, next) => {
  try {
    const orders = await getUsersOrders(req.params.userId);

    if (!orders) throw new AppError("No orders found", 404);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUsersOrderById = async (req, res, next) => {
  try {
    const order = await getUsersOrderById(
      req.params.userId,
      req.params.orderId
    );

    if (!order) throw new AppError("Order not found", 404);

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await updateOrder(req.params.orderId, {
      ...req.body,
    });

    if (!order) throw new AppError("Order not found", 404);

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await deleteUsersOrder(req.params.userId, req.params.orderId);

    if (!order) throw new AppError("Order not found", 404);

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    next(err);
  }
};
