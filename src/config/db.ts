/* eslint-disable @typescript-eslint/no-var-requires */
const connection = require("./knexfile")[process.env.NODE_ENV || "development"];
const database = require("knex")(connection);

export default database;
