const helper = require("../helpers/index");
function notFound(req, res, next) {
  res.status(404);
  const error = new Error("Not Found", req.originalUrl);
  next(error);
}

function errorHandler(err, req, res, next) {
  return helper.centralResponse(
    err.message,
    true,
    res.statusCode || 500,
    "",
    res
  );
}

module.exports = {
  notFound,
  errorHandler,
};
