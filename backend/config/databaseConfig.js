const mysql = require('mysql');
require("dotenv").config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_ID,
    password: process.env.USER_KEY,
    database: process.env.DATABASE,
});

module.exports = db;