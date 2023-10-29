const express = require("express");
const router = express.Router();
const { orderdata } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const order_data = await orderdata.findAll();
  res.json(order_data);
});

router.get("/:orderId", async (req, res) => {
  const orderId = req.params.orderId;
  const order_data = await orderdata.findAll({ where: { orderid: orderId } });
  res.json(order_data);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await orderdata.destroy({ where: { id: id } });

    if (deletedOrder) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", validateToken, async (req, res) => {
  const order_data = req.body;
  await orderdata.create(order_data);
  res.json(order_data);
});

module.exports = router;
