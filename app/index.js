const Fastify = require("fastify");

const logger = require("../configs/logger");
const routes = require("./routes");

const app = Fastify({ logger });

// Register routes
app.register(routes);

module.exports = app;
