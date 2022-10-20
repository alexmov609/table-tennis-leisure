const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in userController.js
const userRoutes = (router) => {
  router.get(process.env.REACT_APP_READ_USER, controllers.readUser);
  router.post(
    process.env.REACT_APP_UPDATE_USER_THEME,
    csrfDefence,
    controllers.updateUserTheme
  );
  router.post(
    "/updateUserAbonement",
    csrfDefence,
    controllers.updateUserAbonement
  );
};

module.exports = userRoutes;
