const DBManager = require("../sequelize");
const { basic_work_schedule } = DBManager.models;

// CRUD functions for table `basicWorkSchedule`

const updateScheduleOfCertainDay = async (day_id, open, close) => {
  await basic_work_schedule.update(
    { open, close },
    {
      where: { day_id },
    }
  );
};

const readWorkSchedule = async (day_id) => {
  const result = await basic_work_schedule.findOne({
    where: { day_id },
    raw: true,
  });

  return result;
};
const readAllWorkSchedules = async (request, response) => {
  let receivedAllWorkSchedules = await basic_work_schedule.findAll({
    attributes: ["open", "close"],
  });
  if (!receivedAllWorkSchedules)
    return response.status(404).send({ msg: "Work schedules were not found" });
  response.json(receivedAllWorkSchedules);
};

const readBasicBlockedDays = async (request, response) => {
  let receivedBasicBlockedDays = await basic_work_schedule.findAll({
    where: { open: "-----" },
    attributes: ["day_id"],
  });
  if (!receivedBasicBlockedDays)
    return response
      .status(404)
      .send({ msg: "Basic blocked days were not found" });
  response.json(receivedBasicBlockedDays);
};

const basicWorkScheduleController = {
  updateScheduleOfCertainDay,
  readWorkSchedule,
  readAllWorkSchedules,
  readBasicBlockedDays,
};
module.exports = basicWorkScheduleController;
