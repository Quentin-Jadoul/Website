let Student = require('../models/studentModel');

const db = require('../db');

function escapeHtml(unsafe) {
    return encodeURIComponent(unsafe).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}



lenStudents = 0;

exports.students = function (req, res) {
    db.query('SELECT COUNT(*) as count FROM students', function(err, result) {
        if (err){
            console.error(err.message);
            return res.status(500).send('Error retrieving student data');
        }
        lenStudents = result[0].count;
        res.render('students.ejs', { title: 'Students', student: [], lenStudents: lenStudents });
    });
};

exports.newStudent = function (req, res) {
    const { firstname, lastname, email, password } = req.body;
    // console.log(req)
    // console.log(firstname, lastname, email)
    db.query('INSERT INTO students (firstname, lastname, email, password) VALUES (?, ?, ?,?)', [ escapeHtml(firstname),  escapeHtml(lastname), email, password], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error inserting student into the database');
        }
        last_id = null;
        lenStudents += 1;
        db.query('SELECT LAST_INSERT_ID() as id', function(err, result) {
            if (err) throw err;
            last_id = result[0].id;
            // console.log(`A new student has been added with id ${last_id}`);
            db.query('SELECT firstname,lastname FROM students WHERE id = ?', [last_id], function(err, student) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Error retrieving student data');
                }
                // console.log(student);
                res.render('students.ejs', { title: 'Students', student: student[0], lenStudents: lenStudents });
            });
        });
    });
};

exports.searchStudentByFirstName = function (req, res) {
    const { firstname } = req.query;
    // console.log(firstname);
    db.query('SELECT firstname,lastname FROM students WHERE firstname = ?', [firstname], function(err, students) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error retrieving student data');
        }
        // console.log(students);
        res.render('students.ejs', { title: 'Students', students: students, lenStudents: lenStudents });
    });
}

exports.searchStudentById = function (req, res) {
    const { Studentid } = req.query;
    // console.log(Studentid);
    db.query('SELECT firstname,lastname FROM students WHERE id = ?', [Studentid], function(err, students) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error retrieving student data');
        }
        // // console.log(student);
        res.render('students.ejs', { title: 'Students', students:students, lenStudents: lenStudents });
    });
}