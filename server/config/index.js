const postsRouter = require("../routes/postsRouter");
const verifyToken = require("../middleware/verifyToken");
const sendWelcomeEmail = require("../middleware/sendWelcomeEmail");
module.exports = (server, router) => {
  server.get("/", (req, res) =>
    res.status(200).json({ message: "sanity check" })
  );
  server.post("/welcome", verifyToken, sendWelcomeEmail, (req, res) =>
    res.status(200).json({ message: "success" })
  );
  server.use("/wall", postsRouter(router));
};
