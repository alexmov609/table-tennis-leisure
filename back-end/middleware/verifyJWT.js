const jwt = require("jsonwebtoken");

//Function that verifies jwtToken
const verifyJWT = (request, response, next) => {
  let csrfToken = request.get("x-xsrf-token");
  let jwtRefreshToken = request.cookies["jwtRefreshToken"];
  if (!jwtRefreshToken) {
    const error = new Error("Middleware. jwtToken is undefined");
    error.status = 401;
    next(error);
    return;
  }

  jwt.verify(jwtRefreshToken, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      const error = new Error(err);
      error.status = 500;
      next(error);
      return;
    }
    request.user_id = decoded.user_id;
    request.authorities = decoded.authorities;

    console.log(
      "Verified " +
        `Request.user_id ${request.user_id} Request.authorities ${request.authorities}`
    );
    next();
  });
};

module.exports = verifyJWT;
