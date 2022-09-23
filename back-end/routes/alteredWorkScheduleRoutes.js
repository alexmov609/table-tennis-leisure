const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in alteredWorkScheduleController.js
const alteredWorkScheduleRoutes = (router) => {
  router.get(
    process.env.REACT_APP_READ_ALTERED_BLOCKED_DATES,
    controllers.readAlteredBlockedDates
  );
  router.post(
    process.env.REACT_APP_DELETE_ALTERED_WORK_SCHEDULE,
    csrfDefence,
    controllers.deleteAlteredWorkSchedule
  );
};

module.exports = alteredWorkScheduleRoutes;
