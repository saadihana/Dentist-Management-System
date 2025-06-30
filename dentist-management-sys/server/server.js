const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Create MySQL connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root", // Add your MySQL username here
    password: "", // Add your MySQL password here
    database: "projetgestionmedicale",
    waitForConnections: true,
    connectionLimit: 10, // Set the connection limit as per your needs
    queueLimit: 0
});

// Connect to the database (we don't need to use `db.connect()` with pool)
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    // Create table if not exists
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS Patient (
            PatientID INT AUTO_INCREMENT PRIMARY KEY,
            PatientFullName VARCHAR(255) NOT NULL,
            PatientSexe ENUM('Masculin', 'Feminin') NOT NULL,
            PatientBirthDate DATE,
            PatientPhoneNumber CHAR(10) NOT NULL,
            PatientSickness TEXT,
            PatientAncientMedicament TEXT,
            PatientTotalAmount DECIMAL(10,2) DEFAULT 0.0,
            CONSTRAINT chk_phone_number CHECK (PatientPhoneNumber REGEXP '^[0-9]{10}$')
        );
    `;
    connection.query(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Checked and ensured Patient table exists.');
        }
    });

    // Insert dummy patient data
    const insertPatientQuery = `
        INSERT INTO Patient (PatientFullName, PatientSexe, PatientBirthDate, PatientPhoneNumber, PatientSickness, PatientAncientMedicament, PatientTotalAmount)
        VALUES ?
    `;
    const patientValues = [
        ['Insaf Benali', 'Feminin', '1985-05-15', '0663610731', 'Flu', 'Paracetamol', 50.00],
        ['Malek Ait Ali', 'Masculin', '1985-05-15', '0663610731', 'Flu', 'Paracetamol', 50.00],
    ];
    connection.query(insertPatientQuery, [patientValues], (err, result) => {
        if (err) {
            console.error('Error inserting dummy patients:', err);
        } else {
            console.log('Inserted ' + result.affectedRows + ' dummy patients');
        }
    });

    // Release the connection
    connection.release();
});

// Get the latest PatientID
app.get('/api/latest-patient-id', (req, res) => {
    const query = 'SELECT PatientID FROM Patient ORDER BY PatientID DESC LIMIT 1';
    pool.query(query, (err, result) => {
        if (err) {
            console.error('Error fetching the latest PatientID:', err);
            return res.status(500).json({ error: 'Error fetching the latest PatientID' });
        }
        const latestPatientID = result[0] ? result[0].PatientID : 0;
        res.status(200).json({ latestPatientID: latestPatientID + 1 });
    });
});

// Add a new patient
app.post('/api/patients', (req, res) => {
    const { fullName, sexe, birthDate, phoneNumber, sickness, ancientMedicament } = req.body;

    const query = `
        INSERT INTO Patient (PatientFullName, PatientSexe, PatientBirthDate, PatientPhoneNumber, PatientSickness, PatientAncientMedicament)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    pool.query(query, [fullName, sexe, birthDate, phoneNumber, sickness, ancientMedicament], (err, result) => {
        if (err) {
            console.error('Database insertion error:', err);
            return res.status(500).json({ error: 'Error saving patient: ' + err.message });
        }
        res.status(201).json({ message: 'Patient added successfully', patientId: result.insertId });
    });
});

// Get a specific patient's details by PatientID
app.get('/api/patient/:id', (req, res) => {
    const patientId = req.params.id;
    const query = 'SELECT * FROM Patient WHERE PatientID = ?';
    pool.query(query, [patientId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        const patient = results[0];
        // Format PatientBirthDate to 'YYYY-MM-DD'
        patient.PatientBirthDate = new Date(patient.PatientBirthDate).toISOString().split('T')[0];
        res.status(200).json(patient);
    });
});

async function testDatabaseConnection() {
    try {
        const [rows] = await pool.promise().query("SELECT 1");
        console.log("Database connected successfully:", rows);
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

testDatabaseConnection();

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
