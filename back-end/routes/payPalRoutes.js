const services = require("../services");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

//End-points for functions declared in paypal_service.js
const payPalRoutes = (router) => {
  router.post(
    process.env.REACT_APP_PROCESS_PAY_PAL_ORDER,
    csrfDefence,
    services.processPayPalOrder
  );
};

module.exports = payPalRoutes;
