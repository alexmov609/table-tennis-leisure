const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { comparePassword } = require("../services/encrypt_service");

const DBManager = require("../sequelize");
const { users } = DBManager.models;

//Back-end function tha is responsible for loggin in a user
const handleLogIn = async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password)
    return response
      .status(400)
      .json({ msg: "Email and password are not set." });

  let receivedUser = await users.findOne({
    where: { email },
    attributes: ["user_id", "authorities", "password", "theme"],
  });

  if (!receivedUser) {
    return response.status(400).send("user does not exist");
  } else {
    receivedUser = receivedUser.toJSON();
  }

  // let passwordsAreSame = await bcrypt.compare(password, receivedUser.password);
  // if (!passwordsAreSame)
  //   return response.status(401).json({ msg: "Password is incorrect" });

  const { authorities, user_id, theme } = receivedUser;
  const csrfToken = request.get("x-xsrf-token");
  const accessToken = jwt.sign({ user_id, sub: csrfToken }, "secret", {
    expiresIn: "1min",
  });

  const refreshToken = jwt.sign(
    { authorities, sub: csrfToken, user_id },
    "secret",
    {
      expiresIn: "1d",
    }
  );

  users.update({ refreshToken }, { where: { user_id } }); //VALID UNTIL
  response
    .cookie("jwtRefreshToken", refreshToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      //secure: true,
      //sameSite: "None";
    })
    .setHeader("X-XSRF-TOKEN", csrfToken)
    .json({ accessToken, authorities, theme });

  // let passwordValidated = user.password === request.body.password;
  // if (!passwordValidated)
  //   return response
  //     .status(401)
  //     .send({ authenticated: false, accessToken: null });
};

module.exports = handleLogIn;
