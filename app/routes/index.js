const fp = require("fastify-plugin");

module.exports = fp(
  async function (appInstance) {
    appInstance.get("/", {}, async function () {
      return {
        app: "Hello ini dari Fastify",
      };
    });

    // GET: /users
    appInstance.get("/user", {}, async function (request, replay) {
      const data = [
        {
          nama: "adhinath",
          email: "adhinath@example.com",
        },
        {
          nama: "raiga",
          email: "raiga@example.com",
        },
      ];
      return replay.code(200).send({
        status: "LOADED",
        statusCode: 200,
        message: "Data berahasil dimuat",
        payload: {
          data,
        },
      });
    });

    // POST: /users
    appInstance.post("/user", {}, async function (request, replay) {
      const user = request.body;
      // const user = {};
      return replay.code(201).send({
        status: "CREATED",
        statusCode: 201,
        message: "Data berahasil dibuat",
        payload: {
          user,
        },
      });
    });
  },
  { name: "app-routes" }
);
