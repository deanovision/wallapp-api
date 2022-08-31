const db = require("../models/postsModel");
const verifyToken = require("../middleware/verifyToken");

module.exports = (router) => {
  router.post("/add-post", verifyToken, addPost);
  router.get("/get-posts", getPosts);
  return router;
};

async function addPost(req, res, next) {
  try {
    if (!req.body.message) {
      res.status(400).json({ message: "bad request, message required" });
      next();
    }
    const { message } = req.body;
    const posts = await db.addPost(message);
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
