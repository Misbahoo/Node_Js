const bcrypt = require("bcrypt");
const mysql = require("mysql");

const adminDB = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mymother123*2332*",
  database: "studentsAPI",
});

const createAdmin = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(401).json({ message: "required inputs are missing" });
  }

  const user = "SELECT * FROM admin WHERE email = ?";

  adminDB.query(user, [email], async (err, result) => {
    if (result.length > 0) {
      res.status(401).json({ message: "User already exists" });
    }
    try {
      const addAdminUser =
        "INSERT INTO admin (firstName, lastName, email, password) VALUES(?,?,?,?)";
      const hashedPassword = await bcrypt.hash(password, 10);

      adminDB.query(
        addAdminUser,
        [firstName, lastName, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(401).json({ message: err.message });
          }
          res.status(200).json({ message: "Admin User created successfully" });
        }
      );
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: error.message });
    }
  });
};

module.exports = { createAdmin };
