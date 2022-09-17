const controllers = require("../controllers");

//End-points for functions declared in basicWorkScheduleController.js
const basicWorkSchedulesRoutes = (router) => {
  router.get(
    process.env.REACT_APP_DELETE_ALTERED_WORK_SCHEDULE,
    controllers.readAllWorkSchedules
  );
  router.get(
    process.env.REACT_APP_READ_BASIC_BLOCKED_DAYS,
    controllers.readBasicBlockedDays
  );
};

module.exports = basicWorkSchedulesRoutes;
