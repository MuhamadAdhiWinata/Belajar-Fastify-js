const UserService = require("../../services/userServices");

module.exports = function (appInstance) {
  const userService = UserService(appInstance);

  async function getList(request, reply) {
    const user = await userService.getList(request.query);
    return reply.code(200).send({
      status: "LOADED",
      statusCode: 200,
      message: "Data berahasil dimuat",
      payload: {
        query: request.query,
        ...user,
      },
    });
  }

  async function create(request, reply) {
    const user = await userService.create(request.body);
    return reply.code(201).send({
      status: "CREATED",
      statusCode: 201,
      message: "Data berahasil dibuat",
      payload: {
        user,
      },
    });
  }

  async function show(request, reply) {
    const params = request.params;
    const user = await userService.show({ id: params.userId });
    return reply.code(200).send({
      status: "LOADED",
      statusCode: 200,
      message: "Data berahasil dimuat",
      payload: {
        params,
        user: user ? user : {},
      },
    });
  }

  async function update(request, reply) {
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
  }

  async function destroy(request, reply) {
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
  }

  return {
    getList,
    create,
    show,
    update,
    destroy,
  };
};
