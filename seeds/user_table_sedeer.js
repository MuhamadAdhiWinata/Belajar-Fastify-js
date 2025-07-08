/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const TABLE_NAME = "users";

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(TABLE_NAME).del();
  await knex(TABLE_NAME).insert([
    { name: "adhi", email: "adhi@example.com" },
    { name: "bela", email: "bela@example.com" },
    { name: "byanca", email: "byanca@example.com" },
    { name: "bryen", email: "bryen@example.com" },
  ]);
};
