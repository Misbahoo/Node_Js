const { logEvent } = require("./logEvent");

const errorhandler = (err, req, res, next) => {
  logEvent(`${err.name} ${err.message}`, "erroLog.txt");
  res.status(500).send(err.message);
};

module.exports = errorhandler;
