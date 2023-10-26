let AcademicYear = require('../models/academicyearModel');
// var mysql = require('mysql');

// let sql = require('../Database/sql');

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'ecamair',
//     multipleStatements: true,
// });

exports.academicYears = function (req, res) {
    res.render('academicyear.ejs', { title: 'Academic Years' });
};