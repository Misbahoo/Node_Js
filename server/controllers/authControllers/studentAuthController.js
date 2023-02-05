const mysql = require("mysql");

const studentDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mymother123*2332*",
  database: "studentsAPI",
});

//authenticating the use to login
const examLogIn = (req, res) => {
  const { login } = req.body;

  const getStudents = "SELECT * FROM students WHERE studentId = ?";
  studentDB.query(getStudents, login, (err, result) => {
    if (result.length === 0)
      return res.status(401).json({ message: "User not found" });
    res.status(200).json(result[0]);
  });
};

module.exports = { examLogIn };
