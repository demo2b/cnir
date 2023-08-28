/**
 * @author Jonas.Fournel
 * @fileOverview
 */
const mysql = require("mysql");

module.exports = function () {
    const mysql      = require('mysql');
    const pool = mysql.createPool({
        connectionLimit : 10,
        host     : 'localhost',
        user     : 'root',
        database : 'cnir'
    })

    return pool;
}
