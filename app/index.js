const Fastify = require("fastify");

const logger = require("../configs/logger");
const { ignoreTrailingSlash } = require("../configs/route");
const routes = require("./routes");

const dbPlugin = require("./plugins/knex");

const responseJSON = require("./cores/decorators/responseJSON");

const { notFoundHandler, errorHandler } = require("./errors");

const app = Fastify({
  ignoreTrailingSlash,
  logger,
});

// ErrorHandler
app.setErrorHandler(errorHandler);
// ErrorHandler
app.setNotFoundHandler(notFoundHandler);
// Register responseJSON
app.register(responseJSON);
// Register plugin
app.register(dbPlugin);
// Register routes
app.register(routes);

module.exports = app;
