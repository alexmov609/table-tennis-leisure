const DBManager = require("../sequelize");
const { tables } = DBManager.models;

const readTables = async (request, response) => {
  let receivedTable = await tables.findAll({});
    response.json(receivedTable);
}
const updateTables = async (request, response) => {
  const {amount} =request.body;
  let receivedTable = await tables.update(
    { amount_of_tables: amount },
    { where:{ID:1}}
  );
  response.json();
};

const tableController = {
  readTables,
  updateTables,
};
module.exports = tableController;