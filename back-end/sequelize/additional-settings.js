module.exports = function executeAdditionalSettings(sequelizeModels) {
  const { users, persons, abonements, orders } = sequelizeModels.models;

  //Initializing relationships such as one-to-one, one-to-many between models
  users.belongsTo(persons, { foreignKey: "user_id" });
  persons.hasOne(users, { foreignKey: "user_id" });

  orders.belongsTo(persons, { foreignKey: "user_id" });
  persons.hasOne(orders, { foreignKey: "user_id" });

  users.hasMany(orders, { foreignKey: "user_id" });
  orders.belongsTo(users, { foreignKey: "user_id" });

  abonements.hasMany(users, { foreignKey: "abonement" });
  users.belongsTo(abonements, { foreignKey: "abonement", as: "abn" });
};
