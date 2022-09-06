const { DataTypes } = require("sequelize");
//ORM model for table `time_periods`
module.exports = (sequelize) => {
  sequelize.define(
    "time_periods",
    {
      time_period_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      end_time: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      price: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: false },
    }
    //{ freezeTableName: true }
  );
};
