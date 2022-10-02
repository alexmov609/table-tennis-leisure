const SQLFunctions = require("./SQLFunctions");
const number_functions = require("./number_functions");

module.exports = { ...SQLFunctions, ...number_functions };
