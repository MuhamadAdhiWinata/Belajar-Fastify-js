module.exports = function (error, request, replay) {
  const status = error.status || "ERROR";
  const statusCode = error.statusCode || "500";
  const message = error.message || "Internal Server Error";

  replay.responseJSON(status, statusCode, message);
};
