const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");
process.on("uncaughtException", function (err) {
  console.log(err);
});
//Routers
const vegetabledateRouter = require("./routes/vegetabledata");
app.use("/vegetabledata", vegetabledateRouter);

const orderdataRouter = require("./routes/orderdata");
app.use("/orderdata", orderdataRouter);

const order_historiesRouter = require("./routes/order_histories");
app.use("/order_histories", order_historiesRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server runing in port 3001");
  });
});
