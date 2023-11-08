// const sqlite3 = require('sqlite3');

// const db = new sqlite3.Database('./mydb.sqlite', (err) => {
//     if (err) {
//         console.error('Error connecting to SQLite database: ' + err.message);
//     } else {
//         db.all("select name from sqlite_master where type='table'", function (err, tables) {
//             console.log(tables);
//         });
//         db.all('SELECT * FROM teachers; ', function (err, rows) {
//             console.log(rows);
//         }
//         );
//         console.log('Connected to SQLite database.');
//         db.run(`CREATE TABLE IF NOT EXISTS students (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             firstname TEXT NOT NULL,
//             lastname TEXT NOT NULL,
//             email TEXT NOT NULL UNIQUE
//         )`, (err) => {
//             if (err) {
//                 console.error('Error creating students table: ' + err.message);
//             } else {
//                 console.log('Students table created successfully.');
//             }
//         });
//         db.run(`CREATE TABLE IF NOT EXISTS teachers (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             firstname TEXT NOT NULL,
//             lastname TEXT NOT NULL,
//             password TEXT NOT NULL
//         )`, (err) => {
//             if (err) {
//                 console.error('Error creating teachers table: ' + err.message);
//             } else {
//                 console.log('Teachers table created successfully.');
//             }
//         });
//         db.all("select name from sqlite_master where type='table'", function (err, tables) {
//             console.log(tables);
//         });
//     }
// });

// // db.run('DROP TABLE IF EXISTS teachers');





// // db.run('INSERT INTO teachers (firstname, lastname, email,password) VALUES ("aret", "a", "a",(select sqlite_version()));', function(err) {
// //     if (err) {
// //         console.error(err.message);
// //         // res.status(500).send('Error inserting teacher into database');
// //     } else {
// //         console.log('ok');
// //     }
// // });

// module.exports = db;