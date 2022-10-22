const controllers = require("../controllers");
const csrf = require("csurf");
const csrfDefence = csrf({ cookie: { httpOnly: true } });

const tableRoutes = (router) => {
  router.get(process.env.REACT_APP_READ_TABLES, controllers.readTables);
  router.post(
    process.env.REACT_APP_UPDATE_TABLES,
    csrfDefence,
    controllers.updateTables
  );
  // router.post(
  //   process.env.REACT_APP_UPDATE_USER_THEME,
  //   csrfDefence,
  //   controllers.updateUserTheme
  // );
  // router.post(
  //   "/updateUserAbonement",
  //   csrfDefence,
  //   controllers.updateUserAbonement
  // );
};



module.exports = tableRoutes;