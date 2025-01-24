const { param } = require("express-validator");

exports.checkParamsId = [
  param("id").isInt({ min: 1 }).withMessage("Invalid id"),
];

exports.checkParamsUserId = [
  param("userId").isInt({ min: 1 }).withMessage("Invalid user id"),
];

exports.checkParamsOrderId = [
  param("orderId").isInt({ min: 1 }).withMessage("Invalid order id"),
];
