const controllers = require("../controllers");

//End-points for functions declared in alteredWorkScheduleController.js
const alteredWorkScheduleRoutes = (router) => {
  router.get(
    process.env.REACT_APP_READ_ALTERED_BLOCKED_DATES,
    controllers.readAlteredBlockedDates
  );
  router.post(
    process.env.REACT_APP_DELETE_ALTERED_WORK_SCHEDULE,
    controllers.deleteAlteredWorkSchedule
  );
};

module.exports = alteredWorkScheduleRoutes;
