const os = require("os");
const fs = require("fs");
// const localConfigPath = "./config.json";
// let localConfig = require(localConfigPath);
// console.log(localConfig);

// fs.writeFile(
//   localConfigPath,
//   JSON.stringify(localConfig),
//   "utf-8",
//   function writeJSON(err) {
//     if (err) return console.log(err);
//     console.log(JSON.stringify(localConfig));
//     console.log("writing to " + localConfigPath);
//   }
// );

console.log(os.userInfo().username);

// получаем модуль Express
const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// создаем приложение
const app = express();
const csrfDefence = csrf({ cookie: { httpOnly: true } });

// устанавливаем обработчик для маршрута "/"

//app.use(express.static("../client/public"));
const router = express.Router();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
//app.use(cors({ origin: "http://localhost:3000" }));

app.get("/form", csrfDefence, function (req, res) {
  // pass the csrfToken to the view
  // res.render('send', { csrfToken: req.csrfToken() })
  res.send({ csrfToken: req.csrfToken() });
});

const routesInitialize = require("./routes");
app.use(routesInitialize);

//app.use("/user", routers.userRoutes);

app.listen(5000);
