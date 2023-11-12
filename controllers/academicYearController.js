const db = require('../db');

// exports.newacademicYear = function (req, res) {
//     db.query('INSERT INTO academicYears (year, comment) VALUES (?, ?)', [req.body.year, req.body.comment], function(err) {
//         console.log('ran newacademicyear');
//         if (err) {
//             console.error(err.message);
//             return res.status(500).send('Error inserting academicYear into the database');
//         }
//         return res.status(200).send('academicYear added successfully');
//     });
// };



exports.newacademicYear = function (req, res) {
    
    console.log(req.body);
    db.query('UPDATE academicYears SET comment = ? WHERE year = ?', [req.body.comment, req.body.year], function(err, result) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Error updating academicYear in the database');
        }

        if (result.affectedRows == 0) {
            // No rows were updated, so insert a new row
            db.query('INSERT INTO academicYears (year, comment) VALUES (?, ?)', [req.body.year, req.body.comment], function(err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).send('Error inserting academicYear into the database');
                }
                return res.status(200).send('academicYear added successfully');
            });
        } else {
            return res.status(200).send('academicYear updated successfully');
        }
    });
};