const router = require("express").Router();
const { users, auth } = require("../libs/index");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const createUserResult = await users.createUser(username, email, password);

    res.json({
      success: true,
      message: createUserResult,
    });
  } catch (e) {
    res.status(400);
    res.json({
      error: true,
      message: e.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const {authorize} = auth;
  const { username: usernameOrEmail, password } = req.body;

  try {
    const token = await authorize(usernameOrEmail, password);

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "You have successfully logged in.",
      });
  } catch (err) {
    res.status(400);
    res.json({
      error: true,
      message: err.message,
    });
  }
});

router.get("/auth", async (req, res) => {
  const {authenticate} = auth;
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
    const auth = authenticate(token);
    if (auth)
      res.json({
        success: true,
        data: auth.data,
      });
  } catch (error) {
    res.status(400);
    res.json({
      error: true,
      message: error.message,
    });
    res.end();
  }
});

module.exports = router;
