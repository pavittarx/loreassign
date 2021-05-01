const users = require("./users");

const { Orders } = require("./../db/collections");

const getOrders = async (username) => {
  if (!username) throw new Error("Username cannot be empty");

  const ordersCollection = await Orders();

  const orders = await ordersCollection.find({ username });

  // Return an empty array if user does not have any orders
  if ((await orders.count()) === 0) return [];

  // Return the list of orders
  const ordersList = [];
  await orders.forEach((order) => ordersList.push(order));
  return ordersList;
};

const addOrders = async (username, order) => {
  const orderDoc = {
    username,
    orderName: order.orderName,
    orderQuantity: order.orderQuantity,
    orderDate: Date.now(),
    orderStatus: "Processing",
  };

  const ordersCollection = await Orders();

  const ordersResult = await ordersCollection.insertOne(orderDoc);

  if (ordersResult.insertedCount === 1)
    return "Your order has been placed successfully.";
  else throw new Error("An error occured while placing your order.");
};

const updateOrders = async (orderId, update) => {
  if(!orderId) throw new Error("OrderId missing. Please provide a orderId");

  const ordersCollection = await Orders();

  const status = await ordersCollection.updateOne({_id: orderId}, {$set: update});

  console.log(status);

  if(status.modifiedCount === 1) 
    return "Your order has been updated successfully";
  else 
    throw new Error("An error occured while updating your order. Please try sometime later.");
};

const removeOrders = async (orderId) => {
  if(!orderId) throw new Error("OrderId missing. Please provide a orderId");

  const ordersCollection = Orders();

  const deleteStatus = ordersCollection.deleteOne({_id: orderId});

  if(status.deletedCount === 1) 
    return "Your order has been deleted successfully";
  else 
    throw new Error("An error occured while deleting your order. Please try sometime later.");
};

module.exports = {
  getOrders,
  addOrders,
  updateOrders,
  removeOrders,
};
