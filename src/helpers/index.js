module.exports = {
  centralResponse: (message, error, code, data, res) => {
    let response = {
      message: message,
      error: error,
      data: data,
    };
    res.status(code).send(response);
  },
};
