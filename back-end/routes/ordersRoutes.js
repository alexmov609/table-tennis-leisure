const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in ordersController.js
const ordersRoutes = (router) => {
  router.get("/readOrders", controllers.readOrders);
  router.post("/updateOrder", csrfDefence, controllers.updateOrder);
  router.get("/readAllOrders", controllers.readAllOrders);
  router.post("/deleteOrder", controllers.deleteOrder);
};

module.exports = ordersRoutes;
