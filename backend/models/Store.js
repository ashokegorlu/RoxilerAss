const db = require("../config/db");

const createStoreTable = `CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(400) NOT NULL
)`;

db.query(createStoreTable, (err) => {
  if (err) console.error("Store Table Creation Error:", err);
});

module.exports = db;
