/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const TABLE_NAME = "users";

exports.up = function (knex) {
  return knex.schema.createTable(TABLE_NAME, (tableConfig) => {
    tableConfig.increments("id");
    tableConfig.string("name", 100).notNullable();
    tableConfig.string("email", 100).notNullable();
    tableConfig.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    tableConfig.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable(TABLE_NAME);
};
