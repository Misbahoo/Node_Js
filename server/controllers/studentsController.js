const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const mysql = require("mysql");

const studentDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mymother123*2332*",
  database: "studentsAPI",
});

const data = {
  students: require("../model/students.json"),
  setStudent: function (data) {
    this.students = data;
  },
};

const getAllStudents = (req, res) => {
  const selectAll = "SELECT * FROM students";
  studentDB.query(selectAll, (err, result) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(200).json(result);
  });
};
const createNewStudent = async (req, res) => {
  //get inputs from form
  const {
    firstName,
    surName,
    otherName,
    studentId,
    state,
    localGovt,
    phoneNumber,
    imgUrl,
  } = req.body;

  //check if all required fields are set
  if (
    !firstName ||
    !surName ||
    !studentId ||
    !state ||
    !localGovt ||
    !phoneNumber
  ) {
    return res
      .status(400)
      .json({ message: "Some or all required fields are empty" });
  }

  //check if the user does not exist
  const selectAll = "SELECT * FROM students";

  studentDB.query(selectAll, async (err, result) => {
    if (err) return res.sendStatus(401).json({ message: err.message });
    const userExist = result.find((person) => person.studentId === st);

    if (userExist) {
      return res.status(401).json({ message: "User already exist" });
    }
    //check if phone number is correct
    if (phoneNumber.length !== 11)
      return res.status(401).json({ message: "invalid phone number" });

    //create the new user with an encrypted password
    try {
      const newStudent = {
        studentId: studentId,
        firstName: firstName,
        surName: surName,
        otherName: otherName,
        state: state,
        localGovt: localGovt,
        phoneNumber: phoneNumber,
        imgUrl: imgUrl,
      };

      const insertStudent =
        "INSERT INTO students (studentId, firstName, surName, otherName, state, localGovt, phoneNumber, imgUrl) VALUES(?,?,?,?,?,?,?,?);";

      studentDB.query(insertStudent, [
        studentId,
        firstName,
        surName,
        otherName,
        state,
        localGovt,
        phoneNumber,
        imgUrl,
      ]);

      data.setStudent([...data.students, newStudent]);
      //write users to a file
      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "students.json"),
        JSON.stringify(data.students)
      );

      res.status(201).json(`Student added successfully`);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
    res.json(result.data);
  });
};

const updateStudent = (req, res) => {
  const {
    studentId,
    firstName,
    surName,
    otherName,
    state,
    localGovt,
    phoneNumber,
    imgUrl,
  } = req.body;
  const { id } = req.params;

  if (
    !id ||
    !studentId ||
    !firstName ||
    !surName ||
    !state ||
    !localGovt ||
    !phoneNumber
  ) {
    return res
      .sendStatus(401)
      .json({ message: "Some required fields are empty" });
  }
  const updateStudent =
    "UPDATE students SET studentId = ?, firstName = ?, surName = ?, otherName = ?, state = ?, localGovt = ?, phoneNumber = ?, imgUrl = ? WHERE id = ?";

  const theValues = [
    studentId,
    firstName,
    surName,
    otherName,
    state,
    localGovt,
    phoneNumber,
    imgUrl,
    id,
  ];

  studentDB.query(updateStudent, theValues, (err, result) => {
    if (err) return res.status(401).json({ message: err.message });
    res.status(200).json({ message: "Student updated successfully" });
  });
};

const deleteStudent = (req, res) => {
  const id = req.params.id;

  console.log(id);
  const deleteStudent = "DELETE FROM students WHERE id = ?";

  studentDB.query(deleteStudent, id, (err, result) => {
    if (err) return res.status(401).json("Student not found");

    res.status(200).json({ message: "Student deleted successfully" });
  });
};

const getStudent = (req, res) => {
  const { id: input } = req.params;

  console.log(input);
  const select = `SELECT * FROM students WHERE studentId = ? OR firstName = ? OR surName = ? OR otherName = ? OR state = ? OR localGovt = ? OR phoneNumber = ?`;

  studentDB.query(
    select,
    [input, input, input, input, input, input, input],
    (err, result) => {
      if (err) return res.status(400).json({ message: err.message });
      res.status(200).json(result);
    }
  );
};

module.exports = {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
  getStudent,
};
