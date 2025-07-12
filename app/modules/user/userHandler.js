const UserService = require("../../services/userServices");

module.exports = function (appInstance) {
  const userService = UserService(appInstance);

  async function getList(request, reply) {
    const user = await userService.getList(request.query);
    return reply.responseJSON("LOADED", 200, "Data Berhasil Dimuat!", {
      query: request.query,
      ...user,
    });
  }

  async function create(request, reply) {
    const user = await userService.create(request.body);
    return reply.responseJSON("CREATED", 200, "Data Berhasil Dibuat!", {
      user,
    });
  }

  async function show(request, reply) {
    const params = request.params;
    const user = await userService.show({ id: params.userId });
    return reply.responseJSON("LOADED", 200, "Data Berhasil Dimuat!", {
      params,
      user: user ? user : {},
    });
  }

  async function update(request, reply) {
    const params = request.params;
    const { userId } = params;
    const user = await userService.update(request.body, userId);
    return reply.responseJSON("UPDATED", 200, "Data Berhasil Diperbarui!", {
      params,
      user,
    });
  }

  async function destroy(request, reply) {
    const params = request.params;
    const { userId } = params;

    await userService.destroy(userId);

    return reply.responseJSON("DELETED", 200, "Data Berhasil Dihapus!", {
      userId,
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
