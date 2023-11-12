const mysql = require('mysql');


var db = mysql.createConnection({
    host: "localhost",
    user: "rpi2",
    port: 3305,
    password: "local",
  });



executeQuery("CREATE DATABASE IF NOT EXISTS SchoolApp;", function(result) {
    // console.log(result);
});

db.query("USE SchoolApp;", function(err, result) {
    if (err) throw err;
    // console.log("Using SchoolApp database.");
});

db.query("CREATE TABLE IF NOT EXISTS teachers (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", function(err, result) {
    if (err) throw err;
    // console.log("Teachers table created successfully.");
});

db.query("CREATE TABLE IF NOT EXISTS academicYears (id INT AUTO_INCREMENT PRIMARY KEY, year VARCHAR(255), comment VARCHAR(255));", function(err, result) {
    if (err) throw err;
    // console.log("AcademicYears table created successfully.");
});

db.query("CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", function(err, result) {
    if (err) throw err;
    // console.log("Students table created successfully.");
    // console.log(result);
});

//Create class table
db.query("CREATE TABLE IF NOT EXISTS classes (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255),teacherCode VARCHAR(255) );", function(err, result) {
    if (err) throw err;
    // console.log("Classes table created successfully.");
});

function executeQuery(query, callback) {
    db.connect(function(err) {
        if (err) throw err;
        // console.log("Connected!");
        db.query(query, function(err, result) {
            if (err) throw err;
            callback(result);
        });
      });

}

module.exports = db;