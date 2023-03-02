const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { notFound, errorHandler } = require("./middlewares");
const app = express();
require("dotenv").config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003",
];
const db = require("./models/connection");

app.use(cors({ origin: ALLOWED_ORIGINS }));
const users = require("./routes/UsersRoutes");

app.use("/api/users", users);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
