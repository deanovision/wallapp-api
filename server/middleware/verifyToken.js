const { Authorizer } = require("@authorizerdev/authorizer-js");
module.exports = verifyToken;
const authRef = new Authorizer({
  authorizerURL: process.env.AUTH_URL,
  redirectURL: process.env.SITE_URL,
  clientID: process.env.AUTH_CLIENT_ID,
});
function verifyToken(req, res, next) {
  authRef
    .validateJWTToken({
      token_type: `access_token`,
      token: req.headers.authorization,
    })
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(401).json({ message: "token not valid" });
    });
}
// async function verifyToken(req, res, next) {
//   try {
//     const res = await authRef
//       .validateJWTToken({
//         token_type: `access_token`,
//         token: req.headers.authorization,
//       })
//       // .catch((err) => {
//       //   throw err;
//       // });
//     //check if token is valid
//     res.is_valid
//       ? next()
//       : res.status(401).json({ message: "token not valid" });
//   } catch (err) {
//     res.status(401).json({ message: "token not valid" });
//   }
// }
