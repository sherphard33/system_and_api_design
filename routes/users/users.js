const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const User = require("../../models/User");

router.get("/", (req, res) => {
  res.send("we are on users");
});

router.post("/create", async (req, res) => {
  const newId = uuidv4();
  const newUser = new User({
    id: newId,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.json({
      message: err,
    });
  }

  console.log(req.body);
});

module.exports = router;
