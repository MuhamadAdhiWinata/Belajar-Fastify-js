module.exports = function (appInstance) {
  const { db } = appInstance;

  async function getList(qs) {
    return await paginate({
      page: parseInt(qs.page) || 1,
      perPage: parseInt(qs.perPage) || 10,
      q: qs.q ? String(qs.q).trim() : null,
    });
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

  async function paginate({ page, perPage, q }) {
    try {
      const qWhere = (query) => {
        if (q) {
          const val = `%${q}%`;
          query.whereILike("name", val).orWhereILike("email", val);
        }
      };
      const { total } = await tableName().where(qWhere).count("id as total").first();

      const currentPage = Math.min(page, perPage);
      const offset = (currentPage - 1) * perPage;
      const lastPage = Math.ceil(total / perPage);

      const data = await tableName().where(qWhere).select("*").limit(perPage).offset(offset);

      return {
        data,
        total,
        page,
        perPage,
        q,
        lastPage,
        firstPage: 1,
      };
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
