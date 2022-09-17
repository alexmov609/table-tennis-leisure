const DBManager = require("../sequelize");
const { altered_work_schedule } = DBManager.models;

// CRUD functions for table `alteredWorkSchedule`

const createAlteredWorkSchedule = async (date, open, close) => {
  await altered_work_schedule.create({ date, open, close });
};
const readAlteredWorkSchedule = async (date) => {
  const result = await altered_work_schedule.findOne({
    where: { date },
    raw: true,
  });

  return result;
};

const readAlteredBlockedDates = async (request, response) => {
  let receivedAlteredBlockedDates = await altered_work_schedule.findAll({
    where: { open: "-----" },
    attributes: ["date"],
  });
  if (!receivedAlteredBlockedDates)
    return response
      .status(404)
      .send({ msg: "Altered blocked dates were not found" });
  response.json(receivedAlteredBlockedDates);
};

const deleteAlteredWorkSchedule = async (request, response) => {
  const { date } = request.body;
  await altered_work_schedule.destroy({ where: { date } });
};

const alteredWorkScheduleController = {
  createAlteredWorkSchedule,
  readAlteredWorkSchedule,
  readAlteredBlockedDates,
  deleteAlteredWorkSchedule,
};
module.exports = alteredWorkScheduleController;
