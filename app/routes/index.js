const fp = require("fastify-plugin");

module.exports = fp(
  async function (appInstance) {
    appInstance.get("/", {}, async function () {
      return {
        app: "Hello ini dari Fastify",
      };
    });

    // GET: /users
    appInstance.get("/user", {}, async function (request, reply) {
      try {
        const data = await this.db("users").select("*");
        return reply.code(200).send({
          status: "LOADED",
          statusCode: 200,
          message: "Data berahasil dimuat",
          payload: {
            data,
          },
        });
      } catch (error) {
        return error;
      }
    });

    // POST: /users
    appInstance.post("/user", {}, async function (request, reply) {
      try {
        const { name, email } = request.body;
        const [userId] = await this.db("users").insert({ name, email });
        const user = await this.db("users").select("*").where({ id: userId }.first());
        return reply.code(201).send({
          status: "CREATED",
          statusCode: 201,
          message: "Data berahasil dibuat",
          payload: {
            user,
          },
        });
      } catch (error) {
        return error;
      }
    });

    // GET: /users/user_id
    appInstance.get("/user/:userId", {}, async function (request, reply) {
      try {
        const params = request.params;
        const user = await this.db("users").select("*").where({ id: params.userId }).first();
        return reply.code(200).send({
          status: "LOADED",
          statusCode: 200,
          message: "Data berahasil dimuat",
          payload: {
            params,
            user: user ? user : {},
          },
        });
      } catch (error) {
        return error;
      }
    });

    // PUT: /users/userId
    appInstance.put("/user/:userId", async function (request, reply) {
      try {
        const { userId } = request.params;
        const { name, email } = request.body;

        const userExist = await this.db("users").select("*").where({ id: userId }).first();

        if (!userExist) {
          return reply.code(404).send({
            status: "DATA_NOT_FOUND",
            statusCode: 404,
            message: "Data tidak ditemukan",
            payload: {
              user: null,
            },
          });
        }

        await this.db("users").where({ id: userId }).update({
          name,
          email,
          updated_at: this.db.fn.now(),
        });

        const updatedUser = await this.db("users").select("*").where({ id: userId }).first();

        return reply.code(200).send({
          status: "UPDATED",
          statusCode: 200,
          message: "Data berhasil diperbarui",
          payload: {
            user: updatedUser,
          },
        });
      } catch (error) {
        return error;
      }
    });

    // DELETE: /user/:userId
    appInstance.delete("/user/:userId", async function (request, reply) {
      try {
        const { userId } = request.params;
        const userExist = await this.db("users").select("*").where({ id: userId }).first();

        if (!userExist) {
          return reply.code(404).send({
            status: "DATA_NOT_FOUND",
            statusCode: 404,
            message: "Data tidak ditemukan",
            payload: {
              userId,
            },
          });
        }

        await this.db("users").where({ id: userId }).del();

        return reply.code(200).send({
          status: "DELETED",
          statusCode: 200,
          message: "Data berhasil dihapus",
          payload: {
            userId,
          },
        });
      } catch (error) {
        return reply.code(500).send({
          status: "ERROR",
          statusCode: 500,
          message: "Terjadi kesalahan saat menghapus data",
          error: error.message,
        });
      }
    });
  },
  { name: "app-routes" }
);
