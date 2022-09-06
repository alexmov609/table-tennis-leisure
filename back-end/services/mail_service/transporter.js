const nodemailer = require("nodemailer");

// Library 'nodemailer'
//Provides options  to send emails programatically( by gmail in our case)

//nodemail settings
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "tabletennisleisureNOREPLY@gmail.com",
    pass: "gaybaagorzfcvofq",
  },
});

const sendMail = (to, subject, text) => {
  transporter.sendMail(
    { from: "tabletennisleisureNOREPLY@gmail.com", to, subject, text },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

module.exports = sendMail;
