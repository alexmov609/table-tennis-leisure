const DBManager = require("../sequelize");
const { users } = DBManager.models;

//Back-end function tha is responsible for loggin out a user
const handleLogout = async (request, response) => {
  const jwtRefreshToken = request.cookies["jwtRefreshToken"];
  if (!jwtRefreshToken)
    return response.status(401).json({
      error: { message: "Logout end-point. jwtRefreshToken is undefined" },
    });
  users.update(
    { refreshToken: null },
    { where: { refreshToken: jwtRefreshToken } }
  ); //VALID UNTIL
  response.clearCookie("jwtRefreshToken", { httpOnly: true }); // sameSite: "None", secure: true
  response.sendStatus(204);

  // Delete refreshToken in db
};

module.exports = handleLogout;
