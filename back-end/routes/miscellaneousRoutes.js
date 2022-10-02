const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in miscellaneousController.js
const miscellaneousRoutes = (router) => {
  router.post(
    process.env.REACT_APP_READ_FILTERED_TIME_PERIODS,
    csrfDefence,
    controllers.readFilteredTimePeriods
  );
  router.get(
    process.env.REACT_APP_READ_UNAVAILABLE_TIME_PERIODS,
    controllers.readUnavaliableTimePeriods
  );
  router.post(
    process.env.REACT_APP_SEND_USER_COMMENT,
    csrfDefence,
    controllers.sendUserComment
  );
};

module.exports = miscellaneousRoutes;
