const services = require("../services");

//End-points for functions declared in paypal_service.js
const payPalRoutes = (router) => {
  router.post(
    process.env.REACT_APP_PROCESS_PAY_PAL_ORDER,
    services.processPayPalOrder
  );
};

module.exports = payPalRoutes;
