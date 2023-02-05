const mysql = require("mysql");

const studentDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mymother123*2332*",
  database: "studentsAPI",
});

const updateResult = (req, res) => {
  const {
    englishMarks,
    mathsMarks,
    chemistryMarks,
    physicsMarks,
    biologyMarks,
  } = req.body;
  const { id } = req.params;

  const total =
    englishMarks + mathsMarks + chemistryMarks + physicsMarks + biologyMarks;

  const theValues = [
    englishMarks,
    mathsMarks,
    chemistryMarks,
    physicsMarks,
    biologyMarks,
    total,
    id,
  ];

  const getStudent =
    "UPDATE students SET english = ?, maths = ?, chemistry = ?, physics = ?, biology = ?, total = ? WHERE studentId = ?";

  studentDB.query(getStudent, theValues, (err, result) => {
    if (err) return res.status(401).json({ message: err.message });
    res.status(200).json({ message: "Result updated" });
  });
};

module.exports = { updateResult };
