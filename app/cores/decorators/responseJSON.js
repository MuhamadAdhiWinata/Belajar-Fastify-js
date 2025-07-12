const fp = require("fastify-plugin");

module.exports = fp(async function (appInstance) {
  appInstance.decorateReply("responseJSON", function (status, statusCode, message, payload = null) {
    this.type("application/json").code(statusCode).send({
      status,
      statusCode,
      message,
      payload,
    });
  });
});
