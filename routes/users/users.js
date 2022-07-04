const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const userService = require("./users.service");
const authorize = require("../auth/authorize");
const Role = require("../auth/roles");

// routes
router.post("/authenticate", authenticate);
router.get(
  "/",
  authorize(Role.admin, { message: "Forbidden operation", status: 403 }),
  getAll
);
router.post(
  "/user",
  authorize([Role.admin, Role.manager], {
    message: "Forbidden operation",
    status: 403,
  }),
  createUser
);
router.delete(
  "/user",
  authorize([Role.admin, Role.manager], {
    message: "Forbidden operation",
    status: 403,
  }),
  deleteUser
);

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) =>
      user ? res.json(user) : res.status(401).json({ message: "Unauthorized" })
    )
    .catch((err) => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch((err) => next(err));
}

function createUser(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  if (!username || !password || !role) {
    return res.status(400).json({
      message: "Missing mandatory fields",
    });
  }
  if (role === "admin") {
    return res.status(403).json({
      message: "Forbidden operation",
    });
  }
  if (userService.getUser(username).length > 0) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }
  const newId = uuidv4();
  const newUser = {
    id: newId,
    username: username,
    password: password,
    role: role,
    users: [],
  };
  userService
    .createUser(newUser, req.user)
    .then((user) =>
      user
        ? res.status(201).json(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
}

function deleteUser(req, res, next) {
  const username = req.body.username;
  userService.deleteUser(username).then((data) => {
    return data
      ? res.status(200).json({
          message: "User deleted",
        })
      : res.status(204);
  });
}

module.exports = router;
