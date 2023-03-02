const express = require("express");
const userRoute = express.Router();

const {
  createUser,
  readUser,
  getUser,
  updateUser,
  deleteUser,
  searchUser,
} = require("../controllers/UsersController");

userRoute.route("/").get(readUser);
userRoute.route("/:id").get(getUser);
userRoute.route("/").post(createUser);
userRoute.route("/:id").put(updateUser);
userRoute.route("/:id").delete(deleteUser);
userRoute.route("/search/:key").get(searchUser);

module.exports = userRoute;
