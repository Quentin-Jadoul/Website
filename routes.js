let express = require('express');
let router = express.Router();

let classController = require('./controllers/classController');
let studentController = require('./controllers/studentController');
let teacherController = require('./controllers/teacherController');
let academicyearController = require('./controllers/academicyearController');

// List of all the routes
router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'Home' });
});
router.get('/classes', classController.classes);
router.get('/students', studentController.students);
router.post('/newStudent', studentController.newStudent);
router.get('/teachers', teacherController.teachers);
router.get('/academicyear', academicyearController.academicYears);

module.exports = router;