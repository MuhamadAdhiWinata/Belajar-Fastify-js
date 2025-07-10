module.exports = function (appInstance) {
  const { db } = appInstance;

  async function getList() {
    try {
      return await tableName().select("*");
    } catch (error) {
      throwError(error);
    }
  }

  async function create({ name, email }) {
    try {
      const [userId] = await tableName().insert({ name, email });
      return await findById(userId);
    } catch (error) {
      throwError(error);
    }
  }

  async function show({ id }) {
    return await findById(id);
  }

  async function update({ name, email }, userId) {
    try {
      const userExist = await findById(userId);

      if (!userExist) {
        throwError("Data Tidak Ditemukan");
      }
      const result = await tableName().update({ name, email, updated_at: db.fn.now() }).where({
        id: userId,
      });

      if (result) {
        return await findById(userId);
      }
    } catch (error) {
      throwError(error);
    }
  }

  async function destroy(userId) {
    try {
      const userExist = await findById(userId);

      if (!userExist) {
        throwError("Data Tidak Ditemukan");
      }
      return await tableName().where({ id: userId }).del();
    } catch (error) {
      throwError(error);
    }
  }

  async function findById(id) {
    try {
      return await tableName().select("*").where({ id }).first();
    } catch (error) {
      throwError(error);
    }
  }

  function tableName() {
    return db("users");
  }

  function throwError(error) {
    throw Error(error);
  }

  return {
    getList,
    create,
    show,
    update,
    destroy,
  };
};
