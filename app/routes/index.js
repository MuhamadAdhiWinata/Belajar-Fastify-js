const fp = require("fastify-plugin");
const userModule = require("../modules/user");

module.exports = fp(
  async function (appInstance) {
    appInstance.get("/", {}, async function () {
      return {
        app: "Hello ini dari Fastify",
      };
    });

    await appInstance.register(userModule.route, { prefix: userModule.prefix });

    // end app-routes
  },
  { name: "app-routes" }
);
