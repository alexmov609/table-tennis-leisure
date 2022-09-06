const controllers = require("../controllers");

//End-points for functions declared in basicWorkScheduleController.js
const basicWorkSchedulesRoutes = (router) => {
  router.get("/readAllWorkSchedules", controllers.readAllWorkSchedules);
  router.get("/readBasicBlockedDays", controllers.readBasicBlockedDays);
};

module.exports = basicWorkSchedulesRoutes;
