const { Sequelize } = require("sequelize");
const additonalSettings = require("./additional-settings");
//DataBase setting
const DBConnection = new Sequelize("table_tennis", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false,
  },
});

const modelsArray = [
  require("./models/user"),
  require("./models/abonement"),
  require("./models/person"),
  require("./models/order"),
  require("./models/basicWorkSchedule"),
  require("./models/alteredWorkSchedule"),
  require("./models/timePeriods"),
];

for (const model of modelsArray) {
  model(DBConnection);
}
additonalSettings(DBConnection);

module.exports = DBConnection;
