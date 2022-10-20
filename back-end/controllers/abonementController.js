const DBManager = require("../sequelize");
const { abonements, users } = DBManager.models;

// CRUD functions for table `abonements`

const readAbonement = async (request, response) => {
  const user_id = request.user_id;
  let receivedAbonement = await abonements.findOne({
    attributes: ["name_of_abonement", "description", "price",],
    include: [
      {
        model: users,
        where: { user_id },
        attributes: [],
      },
    ],
  });
  if (!receivedAbonement)
    return response.status(404).send({ msg: "Abonement was not found" });
  response.json(receivedAbonement);
};

const readAllAbonements = async (request, response) => {
  let receivedAllAbonements = await abonements.findAll({
    // raw: true,
   
  });
  if (!receivedAllAbonements)
    return response.status(404).send({ msg: "Abonements were not found" });
  response.json(receivedAllAbonements);
};

const createAbonement = async (request, response) => {
  const { name_of_abonement, description, price } = request.body;
  abonements.create({ name_of_abonement, description, price });
};

const abonementController = {
  readAbonement,
  readAllAbonements,
  createAbonement,
};
module.exports = abonementController;
