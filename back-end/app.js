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

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}`.trim() });
const express = require("express");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const csrfDefence = csrf({ cookie: { httpOnly: true } });

const router = express.Router();
app.use(express.json());
app.use(cookieParser());

const whitelist = process.env.WHITELIST.split(" ");
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get(process.env.REACT_APP_CSRF, csrfDefence, function (req, res) {
  // pass the csrfToken to the view
  // res.render('send', { csrfToken: req.csrfToken() })
  res.send({ csrfToken: req.csrfToken() });
});

const routesInitialize = require("./routes");
app.use(routesInitialize);

app.use((request, response, next) => {
  const error = new Error("URL not found.");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response
    .status(error.status || 500)
    .json({ error: { message: error.message } });
});

app.listen(5000);
