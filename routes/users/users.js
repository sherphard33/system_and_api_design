const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const User = require("../../models/User");

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
});
//Get one user
router.get("/:email", async (req, res) => {
  await User.findOne({ email: `${req.params.email}` })
    .then((result, err) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});
//Get all users
router.get("/", async (req, res) => {
  const limit = req.body.page || 5;
  try {
    const users = await User.find().limit(limit);
    res.json(users);
  } catch (err) {
    res.json({
      message: err,
    });
  }
});
//Delete user
router.delete("/:email", async (req, res) => {
  await User.remove({ email: `${req.params.email}` })
    .then((result, err) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.put("/:id", async (req, res) => {
  const filter = { name: "Jean-Luc Picard" };
  const update = { age: 59 };

  // `doc` is the document _before_ `update` was applied
  let doc = await Character.findOneAndUpdate(filter, update, { new: true });
  doc.name; // 'Jean-Luc Picard'
  doc.age; // undefined

  doc = await Character.findOne(filter);
  doc.age; // 59
});

module.exports = router;
