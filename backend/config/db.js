const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const urlDb = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@127.0.0.1:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;

const db = mysql.createConnection(urlDb);

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL Database");
  }
});

module.exports = db;
