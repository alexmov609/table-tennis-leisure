const { DataTypes } = require("sequelize");

//ORM model for table `alteredWordSchedule`
module.exports = (sequelize) => {
  sequelize.define(
    "altered_work_schedule",
    {
      date: {
        type: DataTypes.DATEONLY,
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
