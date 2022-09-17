const controllers = require("../controllers");

//End-points for functions declared in adminController.js
const adminRoutes = (router) => {
  router.get(
    process.env.REACT_APP_READ_CUSTOMERS_ABONEMENTS,
    controllers.readCustomersAbonements
  );
  router.get(
    process.env.REACT_APP_READ_CUSTOMERS_AGES,
    controllers.readCustomersAges
  );
  router.post(process.env.REACT_APP_READ_PROFIT, controllers.readProfit);
  router.post(process.env.REACT_APP_READ_DAYS_LOAD, controllers.readDaysLoad);
  router.post(
    process.env.REACT_APP_READ_USERS_DATA_BY_PAYMENT,
    controllers.readUsersDataByPayment
  );
  router.post(
    process.env.REACT_APP_READ_USER_ORDERS_BY_PASSPORT,
    controllers.readUserOrdersByPassport
  );
  router.post(
    process.env.REACT_APP_UPDATE_CERTAIN_DAY_SCHEDULE_AND_SEND_VOUCHERS,
    controllers.updateCertainDayScheduleAndSendVouchers
  );
  router.post(
    process.env.REACT_APP_CREATE_CERTAIN_DATE_SCHEDULE,
    controllers.createCertainDateSchedule
  );
};

module.exports = adminRoutes;
