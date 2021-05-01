const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const compression = require("compression");

const {userRouter, ordersRouter} = require("./server/routes/index")


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use("/api", userRouter);
app.use("/api/orders", ordersRouter);

app.get("/", (req, res) => {
  res.send({
    "message": "Hello World"
  })
});

app.listen(3000, () => {
  console.log("Listening ...");
});
