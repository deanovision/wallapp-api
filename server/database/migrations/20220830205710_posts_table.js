/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.raw(`CREATE TABLE posts(
    id integer PRIMARY KEY autoincrement NOT NULL,
    message text NOT NULL,
    user_name string NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT (datetime('now','localtime'))
  )`);
  // return knex.schema.createTable("posts", (table) => {
  //   table.increments("id");
  //   table.text("message").notNullable();
  //   table.timestamp("created_at").defaultTo(knex.fn.now());
  // });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
