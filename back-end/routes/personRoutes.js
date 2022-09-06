const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in personController.js
const personRoutes = (router) => {
  router.get("/readPerson", controllers.readPerson);
  router.post("/updatePerson", csrfDefence, controllers.updatePerson);
};

module.exports = personRoutes;
