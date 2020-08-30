const jwt = require("jsonwebtoken");

const AuthenticationToken = (req, res, next) => {
  console.log(req);
  let token =
    req.headers["x-access-token"] ||
    req.headers["authorization"] ||
    req.body.token;

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);

      jwt.verify(token, "secret:1234ll", (err, decoded) => {
        if (err) {
          return res.status(401).json({
            success: 401,
            message: "Auth token Expired",
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  }
};

export default AuthenticationToken;
