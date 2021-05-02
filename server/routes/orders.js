const router = require("express").Router();
const { auth, orders } = require("./../libs/index");

// Middleware to authenticate user before accessing orders data
router.all("/", async (req, res, next) => {
  const { authenticate } = auth;
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

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
    res.json({
      success: true,
      data: ordersList,
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
  const { orderId, orderName, orderQuantity, orderStatus } = req.body;

  // Avoid resetting values
  const update = {};
  if (orderName) update["orderName"] = orderName;
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

  console.log(orderId);

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
