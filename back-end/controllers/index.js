const authController = require("./authController");
const userController = require("./userController");
const abonementController = require("./abonementController");
const ordersController = require("./ordersController");
const personController = require("./personController");
const miscellaneousController = require("./miscellaneousController");
const basicWorkScheduleController = require("./basicWorkScheduleController");
const alteredWorkScheduleController = require("./alteredWorkScheduleController");
const timePeriodsController = require("./timePeriodsController");
const adminController = require("./adminController");
const tableController = require("./tableController");

const controllers = {
  ...authController,
  ...userController,
  ...abonementController,
  ...ordersController,
  ...personController,
  ...miscellaneousController,
  ...basicWorkScheduleController,
  ...alteredWorkScheduleController,
  ...timePeriodsController,
  ...adminController,
  ...tableController,

};

module.exports = controllers;
