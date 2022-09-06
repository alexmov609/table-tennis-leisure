const { readWorkSchedule } = require("./basicWorkScheduleController");
const { readAlteredWorkSchedule } = require("./alteredWorkScheduleController");
const auxillary_functions = require("../auxillary_functions");
const DBManager = require("../sequelize");
const { Op, fn, where, col, QueryTypes } = require("sequelize");
const { orders, time_periods } = DBManager.models;

const readDayTimePeriodsLoad = async (request, response) => {
  const { date_of_game } = request.body;
  await orders
    .findAll({
      raw: true,
      where: { date_of_game },
      group: ["date_of_game", "start_time", "end_time"],
      attributes: [
        "start_time",
        "end_time",
        [fn("COUNT", col("date_of_game")), "counted_free_time"],
      ],
    })
    .then((obtainedDayTimePeriodsLoad) => {
      if (!obtainedDayTimePeriodsLoad) {
        return response
          .status(400)
          .send("DayTimePeriodsLoad. !DayTimePeriodsLoad");
      }
      response.json(obtainedDayTimePeriodsLoad);
    });
};
//Function that returns time_periods by DATE if argument `date` was passed,
const readWorkDaySchedule = async (date, day_id) => {
  date = auxillary_functions.SQLDateFormater(date);
  const alteredWorkSchedule = await readAlteredWorkSchedule(date);
  if (!!alteredWorkSchedule) return alteredWorkSchedule;
  return await readWorkSchedule(day_id);
};

const readFilteredTimePeriods = async (request, response) => {
  const { date, day_id } = request.body;
  const { open, close } = await readWorkDaySchedule(date, day_id);
  const filteredTimePeriods = await DBManager.query(
    "SELECT time_periods.start_time,time_periods.end_time,time_periods.time_period_id , p.c " +
      "from `time_periods`LEFT " +
      "join (SELECT orders.start_time, count(orders.order_id) as c " +
      "from `orders` where date_of_game = :date GROUP BY orders.date_of_game,orders.start_time,orders.end_time)  as p " +
      "ON p.start_time = time_periods.start_time " +
      "WHERE time_period_id BETWEEN " +
      "(SELECT time_period_id from `time_periods` WHERE start_time= :open) " +
      "AND (SELECT time_period_id from `time_periods` WHERE end_time= :close) ",
    { replacements: { date, open, close }, type: QueryTypes.SELECT }
  );

  response.json(filteredTimePeriods);
};

const readUnavaliableTimePeriods = async (request, response) => {
  let receivedOrders = await orders.findAll({
    raw: true,
    where: where(fn("CURDATE"), "<=", col("date_of_game")),
    group: ["date_of_game", "start_time", "end_time"],
    attributes: [
      "date_of_game",
      "start_time",
      "end_time",
      [fn("COUNT", col("order_id")), "c"],
    ],
    having: { c: { [Op.eq]: 5 } },
  });
  if (!receivedOrders)
    return response.status(400).send("!readUnavaliableTimePeriods");
  console.log(receivedOrders);
  response.json(receivedOrders);
};

const miscellaneousController = {
  readFilteredTimePeriods,
  readUnavaliableTimePeriods,
};
module.exports = miscellaneousController;
