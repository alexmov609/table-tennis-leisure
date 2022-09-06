const services = require("../services");

//End-points for functions declared in paypal_service.js
const payPalRoutes = (router) => {
  router.post("/processPayPalOrder", services.processPayPalOrder);
};

module.exports = payPalRoutes;
