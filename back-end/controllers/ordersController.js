const DBManager = require("../sequelize");
const { Op, fn, col } = require("sequelize");
const { readPricesOfCertainTimePeriods } = require("./timePeriodsController");
const { orders, users } = DBManager.models;

// CRUD functions for table `orders`

const readOrders = async (request, response) => {
  const user_id = request.user_id;
  let receivedOrders = await orders.findAll({
    where: { user_id },

    attributes: { exclude: ["user_id,payment_status"] },
  });
  if (!receivedOrders)
    return response.status(404).send({ msg: "Orders  were not found" });
  response.json(receivedOrders);
};

const readAllOrders = async (request, response) => {
  let receivedOrders = await orders.findAll({
    attributes: ["date_of_game", "start_time", "end_time"],
  });
  if (!receivedOrders)
    return response.status(404).send({ msg: "Orders were not found" });
  response.json(receivedOrders);
};

const updateOrder = async (request, response) => {
  const user_id = request.user_id;
  console.log(request.body);
};

const createOrders = async (request, response) => {
  const user_id = request.user_id;
  const { chosenTimePeriods, dateOfGame,name_abonement } = request.body;
  let bulkData = await readPricesOfCertainTimePeriods(chosenTimePeriods);

  bulkData = bulkData.map(({ start_time, end_time, price }) => ({
    user_id,
    date_of_game: dateOfGame,
    start_time,
    end_time,
    payment: name_abonement==="free"?price:0,
    payment_status: true,
  }));
    console.log(bulkData);
    console.log(name_abonement);

  await orders.bulkCreate(bulkData);


    response.json("create");
};

const deleteOrder = async (request, response) => {
  const { order_id } = request.body;
  orders.destroy({ where: { order_id } });
};

const ordersController = {
  readOrders,
  updateOrder,
  createOrders,
  readAllOrders,
  deleteOrder,
};
module.exports = ordersController;
