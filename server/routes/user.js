const router = require("express").Router();
const { users, auth } = require("../libs/index");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const createUserResult = await users.createUser(username, email, password);

    res.json({
      success: true,
      result: createUserResult,
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
  const { username: usernameOrEmail, password } = req.body;

  try {
    const token = await auth.authorize(usernameOrEmail, password);

    res.cookie("token", token, {
      maxAge: 72 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({
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

module.exports = router;
