const controllers = require("../controllers");

//End-points for functions declared in abonementController.js
const abonementRoutes = (router) => {
  router.get("/readAbonement", controllers.readAbonement);
  router.get("/readAllAbonements", controllers.readAllAbonements);
  router.post("/createAbonement", controllers.createAbonement);
};

module.exports = abonementRoutes;
