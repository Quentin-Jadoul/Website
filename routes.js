let express = require('express');
let router = express.Router();

let classController = require('./controllers/classController');
let studentController = require('./controllers/studentController');
let teacherController = require('./controllers/teacherController');
let academicYearController = require('./controllers/academicYearController');
// List of all the routes


router.get('/', function (req, res) {
    res.render('index.ejs', { title: 'Home' });
});
router.get('/classes', classController.classes);
router.get('/students', studentController.students);
router.post('/newStudent', studentController.newStudent);
router.get('/teachers', teacherController.teachers);
router.get ('/academicYear',(req, res) => {
        res.sendFile('views/academicYear.html', {root: __dirname });
      });


router.post('/newacademicYear', academicYearController.newacademicYear);

router.post('/newTeacher', teacherController.newTeacher);
router.get('/getteacher', teacherController.searchTeacherByFirstName);
router.get('/getteacherById', teacherController.searchTeacherById);

router.get('/getstudent', studentController.searchStudentByFirstName);
router.get('/getstudentById', studentController.searchStudentById);

router.post('/newClass', classController.newClass);
router.get('/getclass', classController.searchClassByName);
router.get('/getclassById', classController.searchClassById);

module.exports = router;