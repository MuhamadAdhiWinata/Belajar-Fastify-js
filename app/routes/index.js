const fp = require("fastify-plugin");
const UserService = require("../services/userServices");

module.exports = fp(
  async function (appInstance) {
    const userService = UserService(appInstance);

    appInstance.get("/", {}, async function () {
      return {
        app: "Hello ini dari Fastify",
      };
    });

    // GET: /users list
    appInstance.get("/user", {}, async function (request, reply) {
      const data = await userService.getList(request.query);
      return reply.code(200).send({
        status: "LOADED",
        statusCode: 200,
        message: "Data berahasil dimuat",
        payload: {
          query: request.query,
          data,
        },
      });
    });

    // POST: /users
    appInstance.post("/user", {}, async function (request, reply) {
      const user = await userService.create(request.body);
      return reply.code(201).send({
        status: "CREATED",
        statusCode: 201,
        message: "Data berahasil dibuat",
        payload: {
          user,
        },
      });
    });

    // GET: /users/user_id
    appInstance.get("/user/:userId", {}, async function (request, reply) {
      const params = request.params;
      const user = await userService.show({ id: params.userId });
      // const user = await userService.show(params.userId);
      return reply.code(200).send({
        status: "LOADED",
        statusCode: 200,
        message: "Data berahasil dimuat",
        payload: {
          params,
          user: user ? user : {},
        },
      });
    });

    // PUT: /users/userId
    appInstance.put("/user/:userId", async function (request, reply) {
      const params = request.params;
      const { userId } = params;
      const user = await userService.update(request.body, userId);
      return reply.code(200).send({
        status: "UPDATED",
        statusCode: 200,
        message: "Data berhasil diperbarui",
        payload: {
          params,
          user,
        },
      });
    });

    // DELETE: /user/:userId
    appInstance.delete("/user/:userId", async function (request, reply) {
      const params = request.params;
      const { userId } = params;

      await userService.destroy(userId);

      return reply.code(200).send({
        status: "DELETED",
        statusCode: 200,
        message: "Data berhasil dihapus",
        payload: {
          userId,
        },
      });
    });

    // end app-routes
  },
  { name: "app-routes" }
);
