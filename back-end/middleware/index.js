const verifyJWT = require("./verifyJWT");
const roleVerifiers = require("./verifyRole");

module.exports = { verifyJWT, ...roleVerifiers };
