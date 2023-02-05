const mysql = require("mysql");
const bcrypt = require("bcrypt");

const studentDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mymother123*2332*",
  database: "studentsAPI",
});

//authenticating the user login
const adminLogIn = (req, res) => {
  const { email, password } = req.body;

  const getUser = "SELECT * FROM admin WHERE email = ?";
  studentDB.query(getUser, email, async (err, result) => {
    if (result.length === 0) {
      return res.status(401).json({ message: "wrong email or password" });
    }
    const { firstName, lastName, email } = result[0];
    if (await bcrypt.compare(password, result[0].password)) {
      res.status(200).json([firstName, lastName, email]);
    } else {
      res.status(401).json({ message: "wrong email or password" });
    }
  });
};

module.exports = { adminLogIn };
