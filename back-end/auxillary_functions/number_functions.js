const generateNumber = () => {
  return Array(10)
    .fill()
    .map((_) => Math.floor(Math.random() * 10))
    .join("");
};

const number_functions = { generateNumber };
module.exports = number_functions;
