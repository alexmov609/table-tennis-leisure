const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for authentication functions (logInController.js, logoutController.js,refreshController.js)
const authRoutes = (router) => {
  router.post("/login", csrfDefence, controllers.handleLogIn);
  router.get("/logout", csrfDefence, controllers.handleLogout);
  router.get("/refreshToken", csrfDefence, controllers.handleRefreshToken);
  router.post("/createUser", controllers.createUser);
};
module.exports = authRoutes;
