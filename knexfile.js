require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./server/database/wallapdb.db3",
    },
    migrations: {
      directory: "./server/database/migrations",
    },
    seeds: {
      directory: "./server/database/seeds",
    },
    // pool: {
    //   afterCreate: (connection, done) => {
    //     connection.run("PRAGMA foreign_keys = ON", done);
    //   },
    // },
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
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./server/database/testdb.db3",
    },
    migrations: {
      directory: "./server/database/migrations",
    },
    seeds: {
      directory: "./server/database/seeds",
    },
    // pool: {
    //   afterCreate: (connection, done) => {
    //     connection.run("PRAGMA foreign_keys = ON", done);
    //   },
    // },
  },
};
