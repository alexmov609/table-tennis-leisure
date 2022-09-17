const DBManager = require("../sequelize");
const { Op, fn, col } = require("sequelize");
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

const createOrder = async (request, response) => {
  const user_id = request.user_id;
  const { date_of_game, start_time, end_time, payment } = request.body;
  await orders.create({ user_id, date_of_game, start_time, end_time, payment });
  // .then((createdPerson) => {
  //   if (!createdPerson) {
  //     return response.status(403).send("!user Read");
  //   }
  //   response.json(createdPerson);
  // });
};

const deleteOrder = async (request, response) => {
  const { order_id } = request.body;
  orders.destroy({ where: { order_id } });
};

const ordersController = {
  readOrders,
  updateOrder,
  createOrder,
  readAllOrders,
  deleteOrder,
};
module.exports = ordersController;
