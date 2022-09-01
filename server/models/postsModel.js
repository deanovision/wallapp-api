const db = require("../database/index");

module.exports = {
  getPosts,
  addPost,
};

async function getPosts() {
  try {
    const posts = await db("posts").orderBy("created_at", "desc");
    return posts;
  } catch (err) {
    throw err;
  }
}
async function addPost(message, user_name) {
  try {
    await db("posts").insert({ message, user_name });
    posts = await db("posts").orderBy("created_at", "desc");
    return posts;
  } catch (err) {
    throw err;
  }
}
