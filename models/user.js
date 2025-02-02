const db = require('../db');
const bcrypt = require("bcrypt");

// user model
class User {

    // get all the elements
    static getAllUsers() {
        return db.prepare('SELECT * FROM users').all();
    }


    //get User by using name
    static getUserByName(name) {
        const stmt = db.prepare('SELECT * FROM users WHERE name = ?');
        return stmt.run(name);
    }

    // create a new user
    static create(name, email, password) {
        const stmt = db.prepare('INSERT INTO users (name, password, email) VALUES (?, ?, ?)');
        return stmt.run(name, email, password);
    }

    // update the user table by using username
    static async updateUserByName(name, email, password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const stmt = db.prepare('UPDATE users SET email = ?, password = ? WHERE name = ?;');
        return stmt.run(email, hashedPassword, name);
    }

    //delete user by using name
    static delete(name) {
        const stmt = db.prepare('DELETE FROM users WHERE name = ?');
        return stmt.run(name);
    }

    // update the user's name by using name
    static updateName(name, new_name) {
        const stmt = db.prepare('UPDATE users SET name = ? WHERE name = ?;');
        return stmt.run(new_name, name);
    }


    // update the user's email by using name
    static updateEmail(name, email) {
        const stmt = db.prepare('UPDATE users SET email = ? WHERE name = ?;');
        return stmt.run(email, name);
    }


    // update the user's password by using name
    static async updatePassword(name, password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const stmt = db.prepare('UPDATE users SET password = ? WHERE name = ?;');
        return stmt.run(hashedPassword, name);
    }
}

module.exports = User;