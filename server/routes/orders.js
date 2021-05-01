const router = require("express").Router();
const {
  auth: { authenticate },
  orders,
} = require("./../libs/index");

router.all("/", async (req, res, next) => {
  const token = req.headers.cookie && req.headers.cookie.split("=")[1];

  if (!token) {
    res.status(400);
    res.json({
      error: true,
      message: "You have been logged out. Please login to continue.",
    });
    res.end();
    return;
  }

  try {
    const auth = await authenticate(token);
    res.locals.user = auth.data;
  } catch (error) {
    res.status(400);
    res.json({
      error: true,
      message: error.message,
    });
    res.end();
  }

  next();
});

router.post("/", async (req, res) => {
  const {
    user: { username },
  } = res.locals;
  const { orderName, orderQuantity } = req.body;

  try {
    const newOrder = await orders.addOrders(username, {
      orderName,
      orderQuantity,
    });

    res.json({
      success: true,
      message: newOrder,
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: true,
      message: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  const {
    user: { username },
  } = res.locals;

  try {
    const ordersList = await orders.getOrders(username);
    console.log(ordersList);
    res.json({
      success: true,
      orders: ordersList,
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: true,
      message: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  const { orderId, orderQuantity, orderStatus } = req.body;

  // Avoid resetting values
  const update = {};
  if (orderQuantity) update["orderQuantity"] = orderQuantity;
  if (orderStatus) update["orderStatus"] = orderStatus;

  try {
    const updateResult = await orders.updateOrders(orderId, update);
    res.json({
      success: true,
      message: updateResult,
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: true,
      message: error.message,
    });
  }
});

router.delete("", async (req, res) => {
  const { orderId } = req.body;

  try {
    const deleteResult = await orders.deleteOrders(orderId);
    res.json({
      success: true,
      message: deleteResult,
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: true,
      message: error.message,
    });
  }
});

module.exports = router;
