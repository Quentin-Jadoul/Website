const mysql = require('mysql');


var db = mysql.createConnection({
    host: "localhost",
    user: "rpi2",
    password: "local",
    // database: "SchoolApp"
  });



executeQuery("CREATE DATABASE IF NOT EXISTS SchoolApp;", function(result) {
    console.log(result);
});

db.query("USE SchoolApp;", function(err, result) {
    if (err) throw err;
    console.log("Using SchoolApp database.");
});

db.query("CREATE TABLE IF NOT EXISTS teachers (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", function(err, result) {
    if (err) throw err;
    console.log("Teachers table created successfully.");
});

db.query("CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", function(err, result) {
    if (err) throw err;
    console.log("Students table created successfully.");
});

// executeQuery("USE SchoolApp;", function(result) {
//     console.log(result);
// });

// executeQuery("CREATE TABLE IF NOT EXISTS teachers (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", function(result) {
//     console.log(result);
//     console.log("Teachers table created successfully.");
// });

// executeQuery("CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(255), password VARCHAR(255));", function(result) {
//     console.log(result);
//     console.log("Students table created successfully.");
// });

function executeQuery(query, callback) {
    db.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        db.query(query, function(err, result) {
            if (err) throw err;
            callback(result);
        });
      });

}



// const pool = maraidb.createPool({
//     host: 'localhost',
//     user: 'rpi2',
//     password: 'local',
//     connectionLimit: 5,
// })


// async function asyncFunction() {
//     let conn;
//     try {
//       conn = await pool.getConnection();
//       const rows = await conn.query("SELECT 1 as val");
//       console.log(rows); //[ {val: 1}, meta: ... ]
//       const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
//       console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  
//     } catch (err) {
//       throw err;
//     } finally {
//       if (conn) return conn.end();
//     }
//   }

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
//         db.query(`CREATE TABLE IF NOT EXISTS students (
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
//         db.query(`CREATE TABLE IF NOT EXISTS teachers (
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

// db.query('DROP TABLE IF EXISTS teachers');





// db.query('INSERT INTO teachers (firstname, lastname, email,password) VALUES ("aret", "a", "a",(select sqlite_version()));', function(err) {
//     if (err) {
//         console.error(err.message);
//         // res.status(500).send('Error inserting teacher into database');
//     } else {
//         console.log('ok');
//     }
// });

module.exports = db;