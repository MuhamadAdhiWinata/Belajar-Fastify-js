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
          name: "adhinath",
          email: "adhinath@example.com",
        },
        {
          name: "raiga",
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
      const { name, email } = request.body;
      const user = { name, email };
      return replay.code(201).send({
        status: "CREATED",
        statusCode: 201,
        message: "Data berahasil dibuat",
        payload: {
          user,
        },
      });
    });

    // GET: /users/user_id
    appInstance.get("/user/:userId", {}, async function (request, replay) {
      const params = request.params;
      const user = [
        {
          id: params.userId,
          name: "adhinath",
          email: "adhinath@example.com",
        },
      ];
      return replay.code(201).send({
        status: "LOADED",
        statusCode: 201,
        message: "Data berahasil dimuat",
        payload: {
          user,
        },
      });
    });

    // PUT: /users/userId
    appInstance.put("/user/:userId", {}, async function (request, replay) {
      const params = request.params;
      const { name, email } = request.body;
      const user = [
        {
          id: params.userId,
          name,
          email,
        },
      ];
      return replay.code(200).send({
        status: "UPDATED",
        statusCode: 200,
        message: "Data berahasil diperbarui",
        payload: {
          user,
        },
      });
    });

    // Delete: /users/user_id
    appInstance.delete("/user/:userId", {}, async function (request, replay) {
      const params = request.params;
      return replay.code(200).send({
        status: "DELETED",
        statusCode: 200,
        message: "Data berahasil dihapus",
        payload: {
          params,
        },
      });
    });
  },
  { name: "app-routes" }
);
