const jwt = require("jsonwebtoken");
const DBManager = require("../sequelize");
const { users } = DBManager.models;
// require("dotenv").config({ path: `.env.${process.env.NODE_ENV}`.trim() });

const handleRefreshToken = async (request, response) => {
  const csrfToken = request.get("x-xsrf-token");
  const jwtRefreshToken = request.cookies["jwtRefreshToken"];
  if (!jwtRefreshToken)
    return response.status(401).json({
      error: { message: "Refresh end-point. jwtRefreshToken is undefined" },
    });

  let receivedUser = await users.findOne({
    where: { refreshToken: jwtRefreshToken },
    attributes: ["user_id", "authorities", "password", "theme"],
  });

  if (!receivedUser) {
    return response.status(400).json({
      error: { message: "User does not exist" },
    });
  } else {
    receivedUser = receivedUser.toJSON();
  }

  const { user_id, email, authorities } = receivedUser;
  jwt.verify(jwtRefreshToken, process.env.JWT_TOKEN, (err, decoded) => {
    if (err || user_id !== decoded.user_id)
      return response.status(403).json({
        error: { message: "Decoded user_id is not equal to user_id from DB" },
      });

    const accessToken = jwt.sign(
      { authorities, sub: csrfToken, email },
      process.env.JWT_TOKEN,
      { expiresIn: "1m" }
    );
    response.json({ accessToken, authorities });
  });
};

module.exports = handleRefreshToken;
