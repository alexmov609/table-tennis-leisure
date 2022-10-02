const functions = require("./functions");
const sendMail = require("./transporter");

module.exports = { ...functions, sendMail };
