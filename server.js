//require("rootpath")();
const express = require("express");
const bodyParser = require("body-parser");
const usersRouter = require("./routes/users/users");
const basicAuth = require("./routes/auth/auth");
const app = express();
const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
