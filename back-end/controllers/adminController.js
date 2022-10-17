const DBManager = require("../sequelize");
const auxillary_functions = require("../auxillary_functions");
const services = require("../services");
const { updateScheduleOfCertainDay } = require("./basicWorkScheduleController");
const {
  createAlteredWorkSchedule,
} = require("./alteredWorkScheduleController");

const { Op, fn, col, literal, where } = require("sequelize");
const { users, abonements, orders, persons, basic_work_schedule } =
  DBManager.models;

// Admin Functions
//Each of them receive data from font-end and then return processed data back to front-end
//These function are of admin usage mostly
const readCustomersAbonements = async (request, response) => {
  await abonements
    .findAll({
      raw: true,
      attributes: [
        ["name_of_abonement", "x"], // for PieChart
        [fn("COUNT", col("name_of_abonement")), "y"],
      ],
      group: ["name_of_abonement"],
      include: [
        {
          model: users,
          attributes: [],
        },
      ],
    })
    .then((customersAbonements) => {
      if (!customersAbonements) {
        return response
          .status(400)
          .send("readCustomersAbonements. !readCustomersAbonements");
      }

      const total = customersAbonements.reduce((acc, { y }) => acc + y, 0);

      response.json(
        customersAbonements.map(({ x, y }) => {
          const percent = Math.round((y / total) * 100);
          return { x, y, text: `${percent}%` };
        })
      );
    });
};

const readCustomersAges = async (request, response) => {
  await persons
    .findAll({
      raw: true,
      attributes: [
        [fn("FLOOR", literal("year(curdate())-year(date_of_birth)")), "x"],
        [fn("COUNT", col("date_of_birth")), "y"],
      ],
      group: ["x"],
    })
    .then((customersAges) => {
      if (!customersAges) {
        return response
          .status(400)
          .send("readCustomersAges. !readCustomersAges");
      }
      response.json(
        customersAges.map(({x,y}) => {
          return { y, text: ` Amount: ${y}`,x:`${x} years old` };
        })
      );
    });
};

const readProfit = async (request, response) => {
  let {
    start_date = new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toLocaleDateString(),
    end_date = new Date().toLocaleDateString(),
    start_payment = 0,
    end_payment = Math.pow(2, 31) - 1,
  } = request.body;
  console.log(start_date, end_date);

  [start_date, end_date] = auxillary_functions.restSQLDateFormater(
    start_date,
    end_date
  );
  console.log(start_date, end_date);
  await orders
    .findAll({
      attributes: [
        [fn("SUM", col("payment")), "y"],
        ["date_of_game", "x"],
      ],
      group: ["date_of_game"],
      having: {
        x: { [Op.between]: [start_date, end_date] },
        y: { [Op.between]: [start_payment, end_payment] },
      },
    })
    .then((profit) => {
      if (!profit) {
        return response.status(400).send("readProfit. !readProfit");
      }

      response.json(profit);
    });
};

const readDaysLoad = async (request, response) => {
  let {
    start_date = new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toLocaleDateString(),
    end_date = new Date().toLocaleDateString(),
  } = request.body;

  [start_date, end_date] = auxillary_functions.restSQLDateFormater(
    start_date,
    end_date
  );

  await orders
    .findAll({
      attributes: [
        [fn("COUNT", col("date_of_game")), "y"],
        ["date_of_game", "x"],
      ],
      group: ["date_of_game"],
      having: {
        date_of_game: { [Op.between]: [start_date, end_date] },
      },
    })
    .then((timeLoad) => {
      if (!timeLoad) {
        return response.status(400).send("readTimeLoad. !readTimeLoad");
      }
      response.json(timeLoad);
    });
};

const readUsersDataByPayment = async (request, response) => {
  let {
    start_date = new Date(
      new Date().setDate(new Date().getDate() - 30)
    ).toLocaleDateString(),
    end_date = new Date().toLocaleDateString(),
    start_payment = 0,
    end_payment = Math.pow(2, 32) - 1,
  } = request.body;

  [start_date, end_date] = auxillary_functions.restSQLDateFormater(
    start_date,
    end_date
  );

  await orders
    .findAll({
      attributes: [[fn("SUM", col("payment")), "profit"], "user_id"],
      where: { date_of_game: { [Op.between]: [start_date, end_date] } },
      group: ["user_id"],
      having: {
        profit: { [Op.between]: [start_payment, end_payment] },
      },
      include: [
        { model: users, attributes: ["email"] },
        { model: persons, attributes: ["first_name", "surname"] },
      ],
    })
    .then((profit) => {
      if (!profit) {
        return response.status(400).send("readProfit. !readProfit");
      }
      response.json(profit);
    });
};

const readUserOrdersByPassport = async (request, response) => {
  const { passport = "%" } = request.body;
  await orders
    .findAll({
      attributes: ["date_of_game", "start_time", "end_time", "payment"],
      include: {
        model: persons,
        where: {
          passport,
        },
        attributes: [],
      },
    })
    .then((readUsersOrderBy) => {
      if (!readUsersOrderBy) {
        return response.status(400).send("readUsersOrderBy. !readUsersOrderBy");
      }
      response.json(readUsersOrderBy);
    });
};

const updateCertainDayScheduleAndSendVouchers = async (request, response) => {
  let { day_id, open, close } = request.body;

  updateScheduleOfCertainDay(day_id, open, close);
  //Days' numeration starts from 0 - Monday, 1 - Tuesday ... 6 - Sunday in MySQL
  //Days' numeration starts from 0 - Sunday, 1 - Monday ... 6 - Saturday in JavaScript Date object (new Date())
  day_id = day_id === 0 ? 6 : day_id - 1;
  await users
    .findAll({
      raw: true,
      nest: true,
      attributes: ["email"],
      include: {
        model: orders,
        attributes: ["date_of_game", "start_time", "end_time", "order_id"],
        where: {
          [Op.and]: [
            where(fn("WEEKDAY", col("date_of_game")), day_id), //literal(`WEEKDAY(date_of_game) = IF(${day_id}=0,6,${day_id - 1})`)
            where(fn("CURDATE"), "<", col("date_of_game")),
            {
              [Op.or]: [
                where(col("start_time"), "<", open),
                where(col("start_time"), ">", close),
              ],
            },
          ],
        },
      },
    })
    .then((updateCertainDayScheduleAndSendVouchers) => {
      if (!updateCertainDayScheduleAndSendVouchers) {
        return response
          .status(400)
          .send(
            "updateCertainDayScheduleAndSendVouchers. !updateCertainDayScheduleAndSendVouchers"
          );
      }

      // services.sendVouchers(updateCertainDayScheduleAndSendVouchers);
      response.json(updateCertainDayScheduleAndSendVouchers);
      // orders.destroy({
      //   where: {
      //     order_id: updateCertainDayScheduleAndSendVouchers.map(
      //       ({ orders }) => orders.order_id
      //     ),
      //   },
      // });
    });
};

const createCertainDateSchedule = async (request, response) => {
  const { date, open, close } = request.body;
  createAlteredWorkSchedule(date, open, close);
  await users
    .findAll({
      raw: true,
      nest: true,
      attributes: ["email"],
      include: {
        model: orders,
        attributes: ["date_of_game", "start_time", "end_time", "order_id"],
        where: {
          [Op.and]: [
            { date_of_game: date },
            open === "-----" && close === "-----"
              ? undefined
              : {
                  [Op.or]: [
                    where(col("start_time"), "<", open),
                    where(col("start_time"), ">", close),
                  ],
                },
          ],
        },
      },
    })
    .then((createCertainDateSchedule) => {
      if (!createCertainDateSchedule) {
        return response
          .status(400)
          .send("createCertainDateSchedule. !createCertainDateSchedule");
      }

      services.sendVouchers(createCertainDateSchedule);
      response.json(createCertainDateSchedule);
      // orders.destroy({
      //   where: {
      //     order_id: updateCertainDayScheduleAndSendVouchers.map(
      //       ({ orders }) => orders.order_id
      //     ),
      //   },
      // });
    });
};

const adminController = {
  readCustomersAbonements,
  readCustomersAges,
  readProfit,
  readDaysLoad,
  readUsersDataByPayment,
  readUserOrdersByPassport,
  updateCertainDayScheduleAndSendVouchers,
  createCertainDateSchedule,
};
module.exports = adminController;
