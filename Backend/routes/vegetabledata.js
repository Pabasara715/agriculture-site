const express = require("express");
const router = express.Router();
const { vegetabledata } = require("../models");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "luzifer715",
  database: "agriculture",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  }
});

router.get("/", async (req, res) => {
  const listvege = await vegetabledata.findAll();
  res.json(listvege);
});

router.get("/byVegeType/:vegetype", async (req, res) => {
  const vegetype = req.params.vegetype;
  const query = `SELECT * FROM vegetabledata WHERE vegetype = "${vegetype}"`;

  connection.query(query, [vegetype], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

router.post("/", async (req, res) => {
  const vegetable = req.body;
  const vege = await vegetabledata.findOne({
    where: { vegetype: vegetable.vegetype },
  });

  if (vege) {
    return res.status(401).json({ error: "Vegetable Already Exist" });
  }
  await vegetabledata.create(vegetable);
  res.json(vegetable);
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedOrder = await vegetabledata.destroy({ where: { id: id } });

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

router.put("/:vegetype", async (req, res) => {
  const vegetype = req.params.vegetype;
  const { qty, uniteprice } = req.body;

  const vegetable = await vegetabledata.findOne({
    where: { vegetype: vegetype },
  });

  if (!vegetable) {
    return res.status(404).json({ message: "Vegetable not found" });
  }
  await vegetabledata.update(
    { qty: qty, unitprice: uniteprice },
    { where: { vegetype: vegetype } }
  );

  res.json({ message: `Vegetable updated` });
});

router.put("/qtyupdate/:vegetype", async (req, res) => {
  const vegetype = req.params.vegetype;
  const { qty } = req.body;

  const vegetable = await vegetabledata.findOne({
    where: { vegetype: vegetype },
  });

  if (!vegetable) {
    return res.status(404).json({ message: "Vegetable not found" });
  }
  await vegetabledata.update({ qty: qty }, { where: { vegetype: vegetype } });

  res.json({ message: `Vegetable qty updated` });
});

module.exports = router;
