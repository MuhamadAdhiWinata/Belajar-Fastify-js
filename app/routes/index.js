const fp = require("fastify-plugin");

module.exports = fp(
  async function (appInstance) {
    appInstance.get("/", {}, async function () {
      return {
        app: "Hello ini dari Fastify",
      };
    });
  },
  { name: "app-routes" }
);
