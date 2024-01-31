import { Knex } from "knex";

interface Profile {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
}

const createProfileTable = (knex: Knex) => {
  knex.schema.createTable("profile", (table) => {
    table.uuid("id", { primaryKey: true });

    table.string("username");
    table.string("email");
    table.string("passwordHash");
  });
};

export { Profile, createProfileTable };
