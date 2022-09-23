const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in ordersController.js
const ordersRoutes = (router) => {
  router.get(process.env.REACT_APP_READ_ORDERS, controllers.readOrders);
  router.post(
    process.env.REACT_APP_UPDATE_ORDERS,
    csrfDefence,
    controllers.updateOrder
  );
  router.get(process.env.REACT_APP_READ_ALL_ORDERS, controllers.readAllOrders);
  router.post(
    process.env.REACT_APP_DELETE_ORDER,
    csrfDefence,
    controllers.deleteOrder
  );
};

module.exports = ordersRoutes;
