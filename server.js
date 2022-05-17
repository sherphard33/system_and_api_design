const express = require("express");
const server = express();
const mgDb = require("mongoose");
const bdParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.SERVER_PORT || 3000;

//Import Routes
const usersRoute = require("./routes/users/users");
const convRoute = require("./routes/conversion/conversion");
const authRoute = require("./routes/auth/auth");
server.use(bdParser.json());
server.use("/users", usersRoute);
server.use("/conv", convRoute);
server.use("/auth", authRoute);
// View engine setup
server.set("view engine", "ejs");
mgDb.connect(process.env.MONGOURL, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});
server.get("/", (req, res) => {
  res.render("home");
});

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
