const mysql = require("mysql");
require("dotenv").config(); // Load .env variables

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log("Password:", process.env.DB_PASSWORD);

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed: ", err);
    return;
  }
  console.log("Database connected successfully.");
});

module.exports = connection;
