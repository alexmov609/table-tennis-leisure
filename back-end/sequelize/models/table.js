const { DataTypes } = require("sequelize");
//ORM model for table `table`
module.exports = (sequelize) => {
  sequelize.define(
    "tables",
    {
      amount_of_tables: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      
    }
  );
};
