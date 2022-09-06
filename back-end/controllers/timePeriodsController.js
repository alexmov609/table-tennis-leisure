const DBManager = require("../sequelize");
const { time_periods } = DBManager.models;
const { Op, fn, col, literal, where } = require("sequelize");

// CRUD functions for table `time_periods`

const readTimePeriodPriceByID = async (request, response) => {
  const { time_period_id } = request.body;
  let receivedPrice = await time_periods.findOne({
    where: { time_period_id },
    attributes: ["price"],
  });

  if (!receivedPrice) {
    return response.status(400).send("!readTimePeriodPriceByID");
  } else {
    receivedPrice = receivedPrice.toJSON();
  }
  response.json(receivedPrice);
};

const readPricesOfCertainTimePeriods = async (chosenTimePeriods) => {
  // const { time_periods_arr } = request.body;
  let receivedPrices = await time_periods.findAll({
    raw: true,
    where: { time_period_id: { [Op.in]: chosenTimePeriods } },
    attributes: ["time_period_id", "start_time", "end_time", "price"],
  });

  // if (!receivedPrices) {
  //   return response.status(400).send("!readTimePeriodPriceByID");
  // }
  // response.json(receivedPrices);
  return receivedPrices;
};

const timePeriodsController = {
  readPricesOfCertainTimePeriods,
};
module.exports = timePeriodsController;
