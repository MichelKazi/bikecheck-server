/* eslint-disable @typescript-eslint/no-var-requires */
const crypto = require("crypto");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex("profile").del();
  await knex("profile").insert([
    {
      id: crypto.randomUUID(),
      username: "user_01",
      email: "user_01@email.com",
      passwordHash: "12345",
    },
    {
      id: crypto.randomUUID(),
      username: "user_02",
      email: "user_02@email.com",
      passwordHash: "12345",
    },
    {
      id: crypto.randomUUID(),
      username: "user_03",
      email: "user_03@email.com",
      passwordHash: "12345",
    },
  ]);
};
