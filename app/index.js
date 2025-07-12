const Fastify = require("fastify");

const logger = require("../configs/logger");
const { ignoreTrailingSlash } = require("../configs/route");
const routes = require("./routes");

const dbPlugin = require("./plugins/knex");

const responseJSON = require("./cores/decorators/responseJSON");

const app = Fastify({
  ignoreTrailingSlash,
  logger,
});

// Register plugin
app.register(responseJSON);

// Register plugin
app.register(dbPlugin);

// Register routes
app.register(routes);

module.exports = app;
