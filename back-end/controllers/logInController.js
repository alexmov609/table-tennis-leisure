const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const DBManager = require("../sequelize");
const { users } = DBManager.models;

//Back-end function tha is responsible for loggin in a user
const handleLogIn = async (request, response) => {
  const { email, password } = request.body;
  if (!email)
    return response.status(400).json({
      error: { message: "Login endpoint. email is undefined" },
    });
  if (!password)
    return response.status(400).json({
      error: { message: "Login endpoint. password is undefined" },
    });

  let receivedUser = await users.findOne({
    where: { email },
    attributes: ["user_id", "authorities", "password", "theme"],
  });

  if (!receivedUser) {
    return response
      .status(400)
      .json({ error: { message: "User does not exist" } });
  } else {
    receivedUser = receivedUser.toJSON();
  }

  // let passwordsAreSame = await bcrypt.compare(password, receivedUser.password);
  // if (!passwordsAreSame)
  //   return response.status(401).json({ msg: "Password is incorrect" });

  const { authorities, user_id, theme } = receivedUser;
  const csrfToken = request.get("x-xsrf-token");
  const accessToken = jwt.sign(
    { user_id, sub: csrfToken, authorities },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1min",
    }
  );

  const refreshToken = jwt.sign(
    { authorities, sub: csrfToken, user_id },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1d",
    }
  );

  users.update({ refreshToken }, { where: { user_id } });
  response
    .cookie("jwtRefreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      //secure: true,
      //sameSite: "None";
    })
    .json({ accessToken, authorities, theme });
};

module.exports = handleLogIn;
