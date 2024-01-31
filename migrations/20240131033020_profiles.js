/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists("profile", (table) => {
      table
        .uuid("id", { primaryKey: true })
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table.string("username");
      table.string("passwordHash");
    })
    .createTableIfNotExists("bike", (table) => {
      table
        .uuid("id", { primaryKey: true })
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table
        .foreign("profile_id")
        .references("profile.id")
        .inTable("profile")
        .onDelete("CASCADE");

      table.string("make");
      table.string("model");
      table.string("type");
      table.integer("year");
    })
    .createTableIfNotExists("component", (table) => {
      table
        .uuid("id", { primaryKey: true })
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table
        .foreign("bike_id")
        .references("id")
        .inTable("bike")
        .onDelete("CASCADE");

      table.string("type");
      table.float("status");
      table.date("lastServiced");
      table.string("brand");
      table.string("model");
      table.integer("mileage").unsigned();
      table.integer("battery").unsigned();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("profile")
    .dropTableIfExists("bike")
    .dropTableIfExists("component");
};
