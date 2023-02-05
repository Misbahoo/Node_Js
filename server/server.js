const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const PORT = process.env.PORT || 3500;

//custom middlware logger
app.use(logger);

//Third Party middleware for Cross Origin Ressource Sharing

app.use(cors(corsOptions));

//in other words, form data:
//'content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

//build middleware for json
app.use(express.json());

//serve startic files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./router/root"));
app.use("/students", require("./router/api/students"));
app.use("/admin", require("./router/api/admin"));
app.use("/examauth", require("./router/auth/examAuth"));
app.use("/adminauth", require("./router/auth/adminAuth"));
app.use("/results", require("./router/studentResult"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 NOt Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log("Server on running on " + PORT));
