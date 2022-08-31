module.exports = (router) => {
  router.post("/add-message", addMessage);
  router.get("/get-messages", getMessages);
  return router;
};

async function addMessage(req, res, next) {
  try {
    if (!req.body.message) {
      res.status(400).json({ message: "bad request, message required" });
      next();
    }
    const { message } = req.body;
    res.status(201).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
async function getMessages(req, res, next) {
  try {
    //get messages from database
    //return messages via response
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
}
