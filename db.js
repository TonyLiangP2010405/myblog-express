const Database = require('better-sqlite3');
const path = require('path');

// Create/connect to database
const db = new Database(path.join(__dirname, 'database.db'));

// Create tables (initial setup)
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    name varchar(10) PRIMARY KEY NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
  );
  
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    user_name TEXT,
    FOREIGN KEY(name) REFERENCES users(name)
  );
`);

module.exports = db;