const db = require("../models/postsModel");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.post("/add-post", verifyToken, addPost);
  router.get("/get-posts", getPosts);
  return router;
};

async function addPost(req, res) {
  try {
    if (!req.body.message || !req.body.user_name) {
      res
        .status(400)
        .json({ message: "bad request, message and user_name required" });
      return;
    }
    const { message, user_name } = req.body;
    const posts = await db.addPost(message, user_name);
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
async function getPosts(req, res) {
  try {
    const posts = await db.getPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
