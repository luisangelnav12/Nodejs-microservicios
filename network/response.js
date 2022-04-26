exports.success = function (req, res, message, status) {
  let statusCode = status || 200;
  let statusMessage = message || "";

  return res.status(statusCode).send({
    error: false,
    status,
    body: statusMessage,
  });
};

exports.error = function (req, res, message, status) {
  let statusCode = status || 500;
  let statusMessage = message || "Internal Server Error";
  return res.status(statusCode).send({
    error: false,
    status,
    body: statusMessage,
  });
};
