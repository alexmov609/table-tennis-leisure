const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in userController.js
const userRoutes = (router) => {
  router.get("/readUser", controllers.readUser);
  router.post("/updateUserTheme", controllers.updateUserTheme);
};

module.exports = userRoutes;
