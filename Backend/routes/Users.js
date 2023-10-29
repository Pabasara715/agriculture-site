const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password, role } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      role: role,
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
      },
    });
  });
});

module.exports = router;
