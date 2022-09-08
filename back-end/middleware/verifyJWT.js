const jwt = require("jsonwebtoken");
const DBManager = require("../sequelize");
const { user } = DBManager.models;
require("dotenv").config();

//Function that verifies jwtToken
verifyToken = (request, response, next) => {
  let csrfToken = request.get("x-xsrf-token");
  let jwtToken = request.cookies["jwtRefreshToken"];
  if (!jwtToken) return response.status(403).send("verify Token required ");

  jwt.verify(jwtToken, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) response.status(500).send("Authentication failed");
    request.user_id = decoded.user_id;

    console.log("Verified " + `Request.user_id ${request.user_id}`);
    next();
  });
};
isAdmin = (request, response, next) => {
  user
    .findOne({ where: { email: request.body.email } })
    .then((user) =>
      user.authorities === 2
        ? next()
        : response.status(403).send("Admin role requires")
    );
};

const verifiers = { verifyToken, isAdmin };

module.exports = verifiers;
