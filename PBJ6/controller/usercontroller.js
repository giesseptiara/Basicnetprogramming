'use strict';

//var response = require('../res');
var connection = require('../koneksi');

//showAllUser
exports.showAllUser = function (req, res) {
    connection.query('SELECT * FROM biodata', function (error, rows, fields) {
        if (error) {
            console.log(error);
        } else {
            res.send(rows);
        }
        console.log(res);
    });
};