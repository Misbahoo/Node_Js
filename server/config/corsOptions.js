const whitelist = [
  "https://ww.yoursite.come",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
  "http://localhost:5173",
  "https://www.google.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed By Cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
