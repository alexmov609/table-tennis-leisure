const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "abonements",
    {
      id_abonement: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name_of_abonement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
    }
    //{ freezeTableName: true }
  );
};
