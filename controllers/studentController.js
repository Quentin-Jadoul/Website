let Student = require('../models/studentModel');

const db = require('../db');





exports.students = function (req, res) {
    res.render('students.ejs', { title: 'Students' });
};

exports.newStudent = function (req, res) {
    const { firstname, lastname, email } = req.body;
    console.log(req)
    console.log(firstname, lastname, email)
    db.query('INSERT INTO students (firstname, lastname, email) VALUES (?, ?, ?)', [firstname, lastname, email], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error inserting student into database');
        } else {
            console.log(`A new student has been added with rowid ${this.lastID}`);
            res.redirect('/students');
        }
    });
};