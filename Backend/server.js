const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,        
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
  } else {
    console.log("Connected to the database.");
  }
});

db.query(
  `CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    employee_id VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    department VARCHAR(50) NOT NULL,
    date_of_joining DATE NOT NULL,
    role VARCHAR(50) NOT NULL
  )`,
  (err) => {
    if (err) console.error("Error creating table: ", err);
  }
);

app.post("/api/employees", (req, res) => {
  const { name, employee_id, email, phone_number, department, date_of_joining, role } = req.body;

  const query = `INSERT INTO employees (name, employee_id, email, phone_number, department, date_of_joining, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [name, employee_id, email, phone_number, department, date_of_joining, role],
    (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          res.status(400).send({ error: "Duplicate Employee ID or Email" });
        } else {
          res.status(500).send({ error: "Internal Server Error" });
        }
      } else {
        res.status(201).send({ message: "Employee added successfully" });
      }
    }
  );
});

app.get("/api/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      res.status(500).send({ error: "Failed to fetch employees" });
    } else {
      res.status(200).send(results);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
