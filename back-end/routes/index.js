const express = require("express");
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const abonementRoutes = require("./abonementRoutes");
const ordersRoutes = require("./ordersRoutes");
const personRoutes = require("./personRoutes");
const miscellaneousRoutes = require("./miscellaneousRoutes");
const basicWorkScheduleRoutes = require("./basicWorkScheduleRoutes");
const alteredWorkScheduleRoutes = require("./alteredWorkScheduleRoutes");
// const timePeriodsRoutes = require("./timePeriodsRoutes");
const adminRoutes = require("./adminRoutes");
const payPalRoutes = require("./payPalRoutes");
const verifiers = require("../middleware/verifyJWT");
const router = express.Router();

const routersInitializer = (router) => {
  authRoutes(router);
  router.use(verifiers.verifyToken);
  userRoutes(router);
  abonementRoutes(router);
  ordersRoutes(router);
  personRoutes(router);
  miscellaneousRoutes(router);
  basicWorkScheduleRoutes(router);
  alteredWorkScheduleRoutes(router);
  // timePeriodsRoutes(router);
  adminRoutes(router);
  payPalRoutes(router);
};

routersInitializer(router);

module.exports = router;
