const db = require('../db');


exports.newacademicYear = function (req, res) {
    
    // console.log(req.body);
    
    const xssAttacks = ['<script>', 'onmouseover', '<img', 'onerror', 'onclick', 'onload', 'javascript:'];
    if (xssAttacks.some(attack => req.body.comment.includes(attack) || req.body.academicYear.includes(attack))) {
        return res.status(400).send('Potential XSS attack detected');
    }

    if (!/^\d+$/.test(req.body.academicYear)) {
        return res.status(400).send('Invalid academicYear');
    }
    
    db.query('UPDATE academicYears SET comment = ? WHERE year = ?', [req.body.comment, req.body.academicYear], function(err, result) {
        if (err) {
            // console.error(err.message);
            return res.status(500).send('Error updating academicYear in the database');
        }

        if (result.affectedRows == 0) {
            db.query('INSERT INTO academicYears (year, comment) VALUES (?, ?)', [req.body.academicYear, req.body.comment], function(err) {
                if (err) {
                    // console.error(err.message);
                    return res.status(500).send('Error inserting academicYear into the database');
                }
                return res.status(200).send('academicYear added successfully');
            });
        } else {
            return res.status(200).send('academicYear updated successfully');
        }
    });
};



exports.getacademicYearByYear = function (req, res) {
    db.query('SELECT * FROM academicYears WHERE year = ?', [req.query.year], function(err, rows) {
        if (err) {
            // console.error(err.message);
            return res.status(500).send('Error getting academicYear from the database');
        }
        return res.json(rows);
    });
}