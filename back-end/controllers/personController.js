const DBManager = require("../sequelize");
const { persons } = DBManager.models;

// CRUD functions for table `person`

const readPerson = async (request, response) => {
  const user_id = request.user_id;

  let receivedPerson = await persons.findOne({
    where: { user_id },
    attributes: [
      "first_name",
      "surname",
      "date_of_birth",
      "gender",
      "passport",
    ],
  });
  if (!receivedPerson)
    return response
      .status(404)
      .send({ msg: "Basic blocked days were not found" });
  response.json(receivedPerson);
};

const updatePerson = async (request, response) => {
  const user_id = request.user_id;
  const { first_name, surname, date_of_birth, gender, passport } = request.body;

  persons.update(
    { first_name, surname, date_of_birth, gender, passport },
    { where: { user_id } }
  );
  // .then((obtainedPerson) => {
  //   if (!obtainedPerson) {
  //     return response.status(403).send("!user Read");
  //   }
  //   response.json(obtainedPerson);
  // });
};

const createPerson = async (personData) => {
  const { passport, first_name, surname, date_of_birth, gender } = personData;
  await persons.create({
    passport,
    first_name,
    surname,
    date_of_birth,
    gender,
  });
  // .then((obtainedUser) => {
  //   if (!obtainedUser) {
  //     return response.status(403).send("!user Read");
  //   }
  //   response.json(obtainedUser);
  // });
};

const personController = { readPerson, updatePerson, createPerson };
module.exports = personController;
