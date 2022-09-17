const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for authentication functions (logInController.js, logoutController.js,refreshController.js)
const authRoutes = (router) => {
  router.post(
    process.env.REACT_APP_LOGIN,
    csrfDefence,
    controllers.handleLogIn
  );
  router.get(
    process.env.REACT_APP_LOGOUT,
    csrfDefence,
    controllers.handleLogout
  );
  router.get(
    process.env.REACT_APP_REFRESH_TOKEN,
    csrfDefence,
    controllers.handleRefreshToken
  );
  router.post(process.env.REACT_APP_CREATE_USER, controllers.createUser);
};
module.exports = authRoutes;
