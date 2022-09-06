const controllers = require("../controllers");

//End-points for functions declared in adminController.js
const adminRoutes = (router) => {
  router.get("/readCustomersAbonements", controllers.readCustomersAbonements);
  router.get("/readCustomersAges", controllers.readCustomersAges);
  router.post("/readProfit", controllers.readProfit);
  router.post("/readDaysLoad", controllers.readDaysLoad);
  router.post("/readUsersDataByPayment", controllers.readUsersDataByPayment);
  router.post(
    "/readUserOrdersByPassport",
    controllers.readUserOrdersByPassport
  );
  router.post(
    "/updateCertainDayScheduleAndSendVouchers",
    controllers.updateCertainDayScheduleAndSendVouchers
  );
  router.post(
    "/createCertainDateSchedule",
    controllers.createCertainDateSchedule
  );
  router.post("/protoSchedule", controllers.protoSchedule);
};

module.exports = adminRoutes;
