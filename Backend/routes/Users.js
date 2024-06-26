const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (user) {
    return res.status(401).json({ error: "Username Already Exist" });
  }
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      role: "Buyer",
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.status(401).json({ error: "User Doesn't Exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.status(401).json({ error: "Wrong Password" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json({
      accessToken: accessToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  });
});

module.exports = router;
