const { DataTypes } = require("sequelize");
//ORM model for table `orders`
module.exports = (sequelize) => {
  sequelize.define(
    "orders",
    {
      order_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      date_of_game: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      payment: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    }
    // { freezeTableName: true }
  );
};
