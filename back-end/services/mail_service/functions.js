const sendMail = require("./transporter");
const auxillary_functions = require("../../auxillary_functions");

const sendVouchers = async (toUsers) => {
  toUsers = transformUsersArray(toUsers);
  toUsers.forEach(({ email, orders }) => {
    let text = `Dear user, your orders on dates ${orders
      .map((el) => el.date_of_game)
      .join(
        ", "
      )} were cancelled due to change of schedule. Use these vouchers as compensation: ${Array(
      orders.length
    )
      .fill()
      .map((_) => auxillary_functions.generateNumber())}`;
    sendMail(email, "Cancellation of orders", text);
  });
};

const transformUsersArray = (users) => {
  return users.reduce((acc, { email, orders }) => {
    let found = acc.find((el) => el["email"] === email);
    if (found) {
      found["orders"] = [...found["orders"], orders];
      console.log(acc, found);
    } else {
      acc = [...acc, { email, orders: [orders] }];
    }
    return acc;
  }, []);
};

const functions = { sendVouchers };
module.exports = functions;
