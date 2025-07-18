// Update with your config settings.
const dbConfig = require("./configs/database");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  ...dbConfig,
  migrations: {
    tableName: "knex_migrations",
    directory: "./databases/migrations",
  },
  seeds: {},
  directory: "./databases/seeds",
};
