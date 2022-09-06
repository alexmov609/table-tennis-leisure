const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in miscellaneousController.js
const miscellaneousRoutes = (router) => {
  router.post("/readFilteredTimePeriods", controllers.readFilteredTimePeriods);
  router.get(
    "/readUnavaliableTimePeriods",
    controllers.readUnavaliableTimePeriods
  );
};

module.exports = miscellaneousRoutes;
