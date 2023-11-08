let Class = require('../models/classModel');
const db = require('../db');
lenClasses = 0;

exports.classes = function (req, res) {
    db.query('SELECT COUNT(*) as count FROM classes', function(err, result) {
        if (err){
            console.error(err.message);
            return res.status(500).send('Error retrieving classes data');
        }
        lenClasses = result[0].count;
        res.render('classes.ejs', { title: 'Classes', ClassObject: [], lenClasses: lenClasses });
    });
};


exports.newClass = function (req, res) {
    const { name, teacherCode } = req.body;
    // // console.log(req)
    // // console.log(firstname, lastname, email)
    db.query('INSERT INTO classes (name, teacherCode) VALUES (?, ?)', [name, teacherCode], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error inserting class into the database');
        }
        last_id = null;
        lenClasses += 1;
        db.query('SELECT LAST_INSERT_ID() as id', function(err, result) {
            if (err) throw err;
            last_id = result[0].id;
            // console.log(`A new class has been added with id ${last_id}`);
            db.query('SELECT name, teacherCode FROM classes WHERE id = ?', [last_id], function(err, classObject) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Error retrieving class data');
                }
                // console.log(classObject);
                res.render('classes.ejs', { title: 'Classes', ClassObject: classObject[0], lenClasses: lenClasses });
            });
        });
    });
};


exports.searchClassByName = function (req, res) {
    const { name } = req.query;
    // console.log(name);
    db.query('SELECT name, teacherCode FROM classes WHERE name = ?', [name], function(err, classes) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error retrieving class data');
        }
        // // console.log(student);
        res.render('classes.ejs', { title: 'Classes', classes: classes, lenClasses: lenClasses });
    });
}

exports.searchClassById = function (req, res) {
    const { Classid } = req.query;
    // console.log(Classid);
    db.query('SELECT name, teacherCode FROM classes WHERE id = ?', [Classid], function(err, classes) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error retrieving class data');
        }
        // // console.log(student);
        res.render('classes.ejs', { title: 'Classes', classes: classes, lenClasses: lenClasses });
    });
}