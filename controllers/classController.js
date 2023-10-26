let Class = require('../models/classModel');
// var mysql = require('mysql');

// let sql = require('../Database/sql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'ecamair',
//     multipleStatements: true,
// });

exports.classes = function (req, res) {
    res.render('classes.ejs', { title: 'Classes' });
};