const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

const comparePassword = (plainPass, hashword) => {
  //   bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
  //     return err == null ? callback(null, isPasswordMatch) : callback(err);
  //   });
  return bcrypt.compare(plainPass, hashword);
};

const encryption = { encryptPassword, comparePassword };
module.exports = encryption;
