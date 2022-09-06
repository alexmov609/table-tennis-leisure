const controllers = require("../controllers");

//End-points for functions declared in alteredWorkScheduleController.js
const alteredWorkScheduleRoutes = (router) => {
  router.get("/readAlteredBlockedDates", controllers.readAlteredBlockedDates);
  router.post(
    "/deleteAlteredWorkSchedule",
    controllers.deleteAlteredWorkSchedule
  );
};

module.exports = alteredWorkScheduleRoutes;
