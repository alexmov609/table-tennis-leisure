const { DataTypes } = require("sequelize");

//ORM model for table `basicWorkSchedule`
module.exports = (sequelize) => {
  sequelize.define(
    "basic_work_schedule",
    {
      day_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      open: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
      close: {
        type: DataTypes.CHAR(5),
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );
};
