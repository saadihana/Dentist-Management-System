const http = require('http');
const mysql = require('mysql2');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "10.80.6.238",
    user: "ahmed",
    password: "ahmed",
    database: "dms"
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    
});
const resetAutoIncrementQuery = "ALTER TABLE Patient AUTO_INCREMENT = 1";
        db.query(resetAutoIncrementQuery, function (err, result) {
            if (err) throw err;
            console.log("AUTO_INCREMENT reset to 1.");})

// Define the /api/patients endpoint using Express
app.get('/api/patients', (req, res) => {
    db.query("SELECT * FROM Patient WHERE deleted = 0", function (err, results) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Format the PatientBirthDate to 'YYYY-MM-DD'
            results.forEach(patient => {
                patient.PatientBirthDate = new Date(patient.PatientBirthDate).toISOString().split('T')[0];
            });

            // Send the formatted response
            res.status(200).json(results);
        }
    });
});
// PUT request to update patient information
app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const { PatientFullName, PatientSexe, PatientBirthDate, PatientPhoneNumber, PatientSickness, PatientAncientMedicament, PatientTotalAmount } = req.body;

  // SQL query to update the patient details
  const query = `
    UPDATE Patient
    SET PatientFullName = ?, PatientSexe = ?, PatientBirthDate = ?, PatientPhoneNumber = ?, PatientSickness = ?, PatientAncientMedicament = ?, PatientTotalAmount = ?
    WHERE PatientID = ?
  `;

  db.query(query, [PatientFullName, PatientSexe, PatientBirthDate, PatientPhoneNumber, PatientSickness, PatientAncientMedicament, PatientTotalAmount, id], (err, result) => {
    if (err) {
      console.error('Error updating patient:', err);
      return res.status(500).json({ error: 'Failed to update patient' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully' });
  });
});


// Endpoint for deleting a patient (marking as deleted)
app.put('/api/patients/:id/delete', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE Patient SET deleted = 1 WHERE PatientID = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete patient' });
        }
        res.status(200).json({ message: 'Patient marked as deleted successfully' });
    });
});

// Start the server
app.listen(8081, () => {
    console.log('Server running at http://localhost:8081/');
});
