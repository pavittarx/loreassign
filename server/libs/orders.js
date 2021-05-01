const users = require("./users");

const getOrders = async (username) => {
  if (!username) throw new Error("Username cannot be empty");
};

const addOrders = async () => {};

const updateOrders = async () => {};

const removeOrders = async () => {};

module.exports = {
  getOrders,
  addOrders,
  updateOrders,
  removeOrders,
};
