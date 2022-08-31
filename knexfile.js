require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URI,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./server/database/migrations",
    },
    seeds: {
      directory: "./server/database/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URI,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./server/database/migrations",
    },
    seeds: {
      directory: "./server/database/seeds",
    },
  },
  test: {
    client: "pg",
    connection: process.env.TEST_DATABASE_URI,
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./server/database/migrations",
    },
    seeds: {
      directory: "./server/database/seeds",
    },
  },
};
