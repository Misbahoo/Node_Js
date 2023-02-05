const fsPromises = require("fs").promises;
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { format } = require("date-fns");

const logEvent = async (message, logName) => {
  const dateTime = `${format(new Date(), "ddMMyy\tHH:mm:ss")}\n`;
  const logTime = `${dateTime}\t${uuidv4()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logTime
    );
  } catch (e) {
    console.log(e);
  }
};

const logger = (req, res, next) => {
  logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqlog.txt");
  console.log(`${req.method} ${req.path}`);

  next();
};

module.exports = { logEvent, logger };
