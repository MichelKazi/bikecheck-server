/* eslint-disable @typescript-eslint/no-var-requires */
import knexConfig from "../../knexfile";
import knex from "knex";
const connection = knexConfig[process.env.NODE_ENV || "development"];
const db = knex(connection);

export default db;
