const handleLogIn = require("./logInController");
const handleRefreshToken = require("./refreshController");
const handleLogout = require("./logoutController");
const userController = require("./userController");
const abonementController = require("./abonementController");
const ordersController = require("./ordersController");
const personController = require("./personController");
const miscellaneousController = require("./miscellaneousController");
const basicWorkScheduleController = require("./basicWorkScheduleController");
const alteredWorkScheduleController = require("./alteredWorkScheduleController");
const timePeriodsController = require("./timePeriodsController");
const adminController = require("./adminController");

const controllers = {
  handleLogIn,
  handleLogout,
  handleRefreshToken,
  ...userController,
  ...abonementController,
  ...ordersController,
  ...personController,
  ...miscellaneousController,
  ...basicWorkScheduleController,
  ...alteredWorkScheduleController,
  ...timePeriodsController,
  ...adminController,
};

module.exports = controllers;
