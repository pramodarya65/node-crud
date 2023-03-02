const { centralResponse } = require("../helpers/index");
const User = require("../models/User");

module.exports.createUser = async function createUser(req, res, next) {
  try {
    //create new object
    const newUser = new User(req.body);
    // save new object
    const savedUser = await newUser.save();

    return centralResponse("Ok", false, 200, savedUser, res);
  } catch (error) {
    res.status(error.status);
    next(error);
  }
};
module.exports.readUser = async function readUser(req, res, next) {
  try {
    const users = await User.find({});
    console.log(users);
    return centralResponse("Ok", false, 200, users, res);
  } catch (error) {
    res.status(error.status);
    next(error);
  }
};
module.exports.updateUser = async function updateUser(req, res, next) {
  try {
    // update record
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
    let updatedUser = await User.findOne({ _id: req.params.id });
    return centralResponse("Ok", false, 200, updatedUser, res);
  } catch (error) {
    res.status(error.status);
    next(error);
  }
};
module.exports.deleteUser = async function deleteUser(req, res, next) {
  try {
    const result = await User.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 1) {
      return centralResponse(
        "Successfully deleted the document",
        false,
        200,
        "",
        res
      );
    } else {
      const error = new Error(
        "No documents matched the query. Deleted 0 documents."
      );
      res.status(206);
      return next(error);
    }
  } catch (err) {
    res.status(err.status);
    next(err);
  }
};

module.exports.getUser = async function getUser(req, res, next) {
  try {
    let userData = await User.findOne({ _id: req.params.id });
    return centralResponse("Ok", false, 200, userData, res);
  } catch (error) {
    res.status(error.status);
    next(error);
  }
};
module.exports.searchUser = async function getUser(req, res, next) {
  try {
    let userData = await User.find({
      $or: [
        { first_name: { $regex: req.params.key } },
        { last_name: { $regex: req.params.key } },
      ],
    });

    return centralResponse("Ok", false, 200, userData, res);
  } catch (error) {
    res.status(error.status);
    next(error);
  }
};
