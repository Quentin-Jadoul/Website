let Teacher = require('../models/teacherModel');
// var mysql = require('mysql');

// let sql = require('../Database/sql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'ecamair',
//     multipleStatements: true,
// });

exports.teachers = function (req, res) {
    res.render('teachers.ejs', { title: 'Teachers' });
    console.log("teachers");
};