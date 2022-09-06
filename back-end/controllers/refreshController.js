const jwt = require("jsonwebtoken");
const DBManager = require("../sequelize");
const { users } = DBManager.models;

const handleRefreshToken = async (request, response) => {
  const csrfToken = request.get("x-xsrf-token");
  const jwtRefreshToken = request.cookies["jwtRefreshToken"];
  if (!jwtRefreshToken) return response.status(401).send("handleRefreshToken");

  //   const cookies = request.cookies;
  //   if (!cookies?.jwt) return response.sendStatus(401);
  //   const refreshToken = cookies.jwt;

  await users
    .findOne({ where: { refreshToken: jwtRefreshToken } })
    .then((user) => {
      if (!user) {
        return response.status(403).send("refresh !user");
      }
      const { email, authorities } = user;
      jwt.verify(jwtRefreshToken, "secret", (err, decoded) => {
        if (err || user.user_id !== decoded.user_id)
          return response.status(403).send("user.user_id !== decoded.user_id");
        const accessToken = jwt.sign(
          { authorities, sub: csrfToken, email },
          "secret",
          { expiresIn: "1m" }
        );
        response.json({ accessToken, authorities });
      });
    });
};

module.exports = handleRefreshToken;
