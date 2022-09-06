const { DataTypes } = require("sequelize");
//ORM model for table `persons`
module.exports = (sequelize) => {
  sequelize.define(
    "persons",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      passport: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }
    //{ freezeTableName: true }
  );
};
