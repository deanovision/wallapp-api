const { faker } = require("@faker-js/faker");
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const posts = [];
for (let i = 0; i < 50; i++) {
  posts.push({
    message: faker.lorem.paragraph(),
    user_name: faker.internet.userName(),
  });
}
exports.seed = async function (knex) {
  await knex("posts").del();
  await knex("posts").insert(posts);
};
