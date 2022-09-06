const SQLDateFormater = (DateString) => {
  let reg = /[0-9]{4}-[0-9]{2}-[0-9]{2}/; // WARNING
  if (reg.test(DateString)) return DateString;
  const result = DateString.split(".");
  const year = result[2];
  const month = result[1];
  const day = result[0];
  console.log(DateString);
  return `${year}-${month}-${day}`;
};

const restSQLDateFormater = (...DateString) => DateString.map(SQLDateFormater);
const SQLFunctions = { SQLDateFormater, restSQLDateFormater };
module.exports = SQLFunctions;
