const { DataTypes } = require("sequelize");
const { encryptPassword } = require("../../services/encrypt_service");
//ORM model for table `users`
module.exports = (sequelize) => {
  sequelize.define(
    "users",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      authorities: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      abonement: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      theme: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await encryptPassword(user.password);
        },
      },
    }
  );
};
