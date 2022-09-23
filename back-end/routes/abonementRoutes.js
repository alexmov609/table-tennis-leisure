const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in abonementController.js
const abonementRoutes = (router) => {
  router.get(process.env.REACT_APP_READ_ABONEMENT, controllers.readAbonement);
  router.get(
    process.env.REACT_APP_READ_ALL_ABONEMENTS,
    controllers.readAllAbonements
  );
  router.post(
    process.env.REACT_APP_CREATE_ABONEMENT,
    csrfDefence,
    controllers.createAbonement
  );
};

module.exports = abonementRoutes;
