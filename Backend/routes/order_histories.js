const express = require("express");
const router = express.Router();
const { order_histories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const orderhistories = await order_histories.findAll({
    where: { UserId: id },
  });
  res.json(orderhistories);
});

router.get("/", async (req, res) => {
  const orderhistories = await order_histories.findAll();
  res.json(orderhistories);
});

router.post("/", validateToken, async (req, res) => {
  const orderhistories = req.body;
  const username = req.user.username;
  const userid = req.user.id;
  orderhistories.username = username;
  orderhistories.UserId = userid;
  await order_histories.create(orderhistories);
  res.json(orderhistories);
});

module.exports = router;
