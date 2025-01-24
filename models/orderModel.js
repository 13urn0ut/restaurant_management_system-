const { sql } = require("../dbConnection");

exports.createOrder = async (order) => {
  const [createdOrder] = await sql`
   INSERT INTO orders
   ${sql(order, "customer_id", "total", "status_id", "order_time")}

   RETURNING orders.*
   `;

  return createdOrder;
};

exports.getUsersOrders = async (userId) => {
  const orders = await sql`
    SELECT orders.*
    FROM orders
    WHERE orders.customer_id = ${userId}
    `;

  return orders;
};

exports.getUsersOrderById = async (userId, orderId) => {
  const [order] = await sql`
    SELECT orders.*
    FROM orders
    WHERE orders.customer_id = ${userId}
    AND orders.id = ${orderId}
    `;

  return order;
};

exports.updateOrder = async (orderId, order) => {
  const [updatedOrder] = await sql`
  UPDATE orders
  SET ${sql(order)}
  WHERE orders.id = ${orderId}
  
  RETURNING orders.*
  `;

  return updatedOrder;
};

exports.deleteUsersOrder = async (userId, orderId) => {
  const [deletedOrder] = await sql`
    DELETE FROM orders
    WHERE orders.customer_id = ${userId}
    AND orders.id = ${orderId}

    RETURNING orders.*
    `;

  return deletedOrder;
};
