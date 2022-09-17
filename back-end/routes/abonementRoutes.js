const controllers = require("../controllers");

//End-points for functions declared in abonementController.js
const abonementRoutes = (router) => {
  router.get(process.env.REACT_APP_READ_ABONEMENT, controllers.readAbonement);
  router.get(
    process.env.REACT_APP_READ_ALL_ABONEMENTS,
    controllers.readAllAbonements
  );
  router.post(
    process.env.REACT_APP_CREATE_ABONEMENT,
    controllers.createAbonement
  );
};

module.exports = abonementRoutes;
