const mysql = require('mysql');
module.exports = function() {
    return function () {
        return mysql.createConnection({
            "host": process.env.HOST,
            "user": process.env.USER,
            "password": process.env.PASSWORD,
            "database": process.env.DATABASE
        });
    };
};