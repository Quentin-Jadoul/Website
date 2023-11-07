let Teacher = require('../models/teacherModel');
// var mysql = require('mysql');
const db = require('../db');

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


exports.newTeacher = function (req, res) {
    const { firstname, lastname, password } = req.body;
    console.log(req);
    console.log(firstname, lastname, password);

    // Create a vulnerable SQL query by directly interpolating user input
    const sql = "INSERT INTO teachers (firstname, lastname, password) VALUES (" +
        `'${firstname}', '${lastname}', '${password}'` + ")";
    console.log(sql);
    db.run(sql, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error inserting teacher into the database');
        }

        console.log(`A new teacher has been added with rowid ${this.lastID}`);
        // This code remains the same as before
        db.get('SELECT * FROM teachers WHERE id = ?', this.lastID, function(err, teacher) {
            if (err) {
                console.error(err.message);
                return res.status(500).send('Error retrieving teacher data');
            }

            // Render the view with the added teacher's data
            res.render('teachers.ejs', { title: 'Teachers', teacher: teacher });
        });
    });
};

// exports.newTeacher = function (req, res) {
//     const { firstname, lastname, password } = req.body;
//     console.log(req)
//     console.log(firstname, lastname, password)

//     db.run('INSERT INTO teachers (firstname, lastname, email,password) VALUES (?, ?, ?,?)', [firstname, lastname, email, password], function(err) {
//         if (err) {
//             console.error(err.message);
//             res.status(500).send('Error inserting teacher into database');
//         } else {
//             console.log(`A new teacher has been added with rowid ${this.lastID}`);
//             // res.redirect('/teachers');
//             db.get('SELECT * FROM teachers WHERE id = ?', this.lastID, function(err, teacher) {
//                 if (err) {
//                     console.error(err.message);
//                     res.status(500).send('Error retrieving teacher data');
//                 } else {
//                     // Render the view with the added teacher's data
//                     res.render('teachers.ejs', { title: 'Teachers', teacher: teacher });
//                 }
//             });
//         }
//     });
// };



exports.searchTeacherByFirstName = function (req, res) {
    const { firstname } = req.query;
    console.log(firstname);
    sql = "SELECT * FROM students WHERE firstname = " + `'${firstname}'`;
    console.log(sql)
    db.all(sql, function (err, rows) {
    // db.all('SELECT * FROM teachers WHERE firstname = ?',firstname, function (err, rows) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error retrieving teacher data');
        } else {
            console.log(rows);

            res.render('teachers.ejs', { title: 'Teachers', teachers: rows });
        }
    });
}