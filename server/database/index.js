const knex = require("knex");
const config = require("../../knexfile.js");
const currentEnvironment = process.env.NODE_ENV || "development";
const db = knex(config[currentEnvironment]);

module.exports = db;
