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
  await basic_work_schedule
    .findAll({
      attributes: ["open", "close"],
    })
    .then((obtainedAllSchedules) => {
      if (!obtainedAllSchedules) {
        return response.status(403).send("!obtainedAllSchedules");
      }
      response.json(obtainedAllSchedules);
    });
};

const readBasicBlockedDays = async (request, response) => {
  await basic_work_schedule
    .findAll({
      where: { open: "-----" },
      attributes: ["day_id"],
    })
    .then((obtainedBlockedDays) => {
      if (!obtainedBlockedDays) {
        return response.status(403).send("!obtainedBlockedDays");
      }
      response.json(obtainedBlockedDays);
    });
};

const basicWorkScheduleController = {
  updateScheduleOfCertainDay,
  readWorkSchedule,
  readAllWorkSchedules,
  readBasicBlockedDays,
};
module.exports = basicWorkScheduleController;
