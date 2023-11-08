let Teacher = require('../models/teacherModel');
const db = require('../db');
const bcrypot = require('bcrypt');
const saltRounds = 10;

let lenTeachers = 0;

exports.teachers = function (req, res) {
    db.query('SELECT COUNT(*) as count FROM teachers', function(err, result) {
        if (err){
            console.error(err.message);
            return res.status(500).send('Error retrieving teacher data');
        }
        lenTeachers = result[0].count;
        res.render('teachers.ejs', { title: 'Teachers', teacher: [], lenTeachers: lenTeachers });
    });

    // console.log("teachers");
};


exports.newTeacher = function (req, res) {
    const { firstname, lastname, password, email } = req.body;
    bcrypot.hash(password, saltRounds, function(err, hash) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error hashing password');
        }
        db.query('INSERT INTO teachers (firstname, lastname, email, password) VALUES (?, ?, ?, ?)', [firstname, lastname, email, hash], function(err) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error inserting teacher into the database');
            }
            last_id = null;
            lenTeachers += 1;
            db.query('SELECT LAST_INSERT_ID() as id', function(err, result) {
                if (err) throw err;
                last_id = result[0].id;
                // console.log(`A new teacher has been added with id ${last_id}`);
                db.query('SELECT firstname, lastname FROM teachers WHERE id = ?', [last_id], function(err, teacher) {
                    if (err) {
                        console.error(err.message);
                        return res.status(500).send('Error retrieving teacher data');
                    }
                    // console.log(teacher);
                    res.render('teachers.ejs', { title: 'Teachers', teacher: teacher[0], lenTeachers: lenTeachers });
                });
            });


        });
    });
};




exports.searchTeacherByFirstName = function (req, res) {
    const { firstname } = req.query;
    // console.log(firstname);
    // sql = "SELECT * FROM students WHERE firstname = " + `'${firstname}'`;
    // // console.log(sql)
    // db.query(sql, function (err, rows) {
    db.query('SELECT firstname, lastname FROM teachers WHERE firstname = ?',firstname, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error retrieving teacher data');
        } else {
            // console.log(rows);

            res.render('teachers.ejs', { title: 'Teachers', teachers: rows, lenTeachers: lenTeachers });
        }
    });
}



exports.searchTeacherById = function (req, res) {
    const { Teacherid } = req.query;
    // console.log(Teacherid);
    sql = "SELECT firstname, lastname FROM teachers WHERE id = " + `'${Teacherid}'`;
    // console.log(sql)
    db.query(sql, function (err, rows) {
    // db.all('SELECT * FROM teachers WHERE firstname = ?',firstname, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error retrieving teacher data');
        } else {
            // console.log(rows);

            res.render('teachers.ejs', { title: 'Teachers', teachers: rows, lenTeachers: lenTeachers });
        }
    });
}