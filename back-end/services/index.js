const mailService = require("./mail_service");
const payPalservice = require("./paypal_service");

const services = { ...mailService, ...payPalservice };
module.exports = services;
