const DBManager = require("../sequelize");
const { users, abonements, orders, persons } = DBManager.models;
const { encryptPassword } = require("../services/encrypt_service");

// CRUD functions for table `user`

const readUser = async (request, response) => {
  const user_id = request.user_id;

  console.log("readUser, user_id" + request.user_id);
  await users
    .findOne({
      where: { user_id },
      attributes: ["user_id", "email"],
      include: [
        // {
        //   model: persons,
        //   attributes: [
        //     "passport",
        //     "first_name",
        //     "surname",
        //     "date_of_birth",
        //     "gender",
        //   ],
        // },
      ],
    })
    .then((obtainedUser) => {
      if (!obtainedUser) {
        return response.status(403).send("!user Read");
      }
      response.json(obtainedUser);
    });
};

const createUser = async (request, response) => {
  const {
    email,
    password,
    first_name,
    surname,
    passport,
    date_of_birth,
    gender,
  } = request.body;

  let createdUser = await users.create(
    {
      email,
      password,
      theme: 1,
      authorities: 1,
      abonement: 1,
    },
    { raw: true }
  );
  const { user_id } = createdUser;
  await persons.create({
    user_id,
    first_name,
    surname,
    passport,
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

const updateUserAbonement = async (request, response) => {
  const user_id = request.user_id;
  const { abonement } = request.body;
  await users.update({ abonement }, { where: { user_id } });
  // .then((obtainedUser) => {
  //   if (!obtainedUser) {
  //     return response.status(403).send("!user Read");
  //   }
  //   response.json(obtainedUser);
  // });
};
const updateUserTheme = async (request, response) => {
  const user_id = request.user_id;
  const { theme } = request.body;
  await users.update({ theme }, { where: { user_id } });
  // .then((obtainedUser) => {
  //   if (!obtainedUser) {
  //     return response.status(403).send("!user Read");
  //   }
  //   response.json(obtainedUser);
  // });
};

const userController = { readUser, createUser, updateUserTheme };
module.exports = userController;
