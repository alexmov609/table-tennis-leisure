const { Sequelize } = require("sequelize");
const additonalSettings = require("./additional-settings");
require("dotenv").config();
//DataBase setting
console.log(process.env.DATABASE_USERNAME);
const DBConnection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
    define: {
      timestamps: false,
    },
  }
);

const modelsArray = [
  require("./models/user"),
  require("./models/abonement"),
  require("./models/person"),
  require("./models/order"),
  require("./models/basicWorkSchedule"),
  require("./models/alteredWorkSchedule"),
  require("./models/timePeriods"),
  require("./models/table"),
];

for (const model of modelsArray) {
  model(DBConnection);
}
additonalSettings(DBConnection);

module.exports = DBConnection;
