const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const compression = require("compression");

const path = require("path");
const {userRouter, ordersRouter} = require("./server/routes/index")


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use("/api", userRouter);
app.use("/api/orders", ordersRouter);

app.use(express.static(path.join(__dirname, "dist/")));

app.get("/", (req, res) => {
  res.status(200);
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening ...");
});
