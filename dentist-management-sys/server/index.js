const express = require('express');
const { Sequelize, DataTypes, DATE } = require('sequelize');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;


const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});


const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

 // MySQL Connection with Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

app.post('/api/add-user',async (req , res)=>{
  const sql = "INSERT INTO user (`Name`, `lastName`, `phoneNum`,`username`,`password`) VALUES (?)";
  const values= [
      req.body.nom,
      req.body.prenom,
      req.body.telephone,
      req.body.username,
      req.body.password
  ];
  console.log(values);
  db.query(sql, [values], (err, data) => {
      if(err) {
          return res.json("Error");
      }
      console.log(data);
      return res.json(data);
  })
} )

app.post('/api/login', async (req , res)=>{
  const sql = "SELECT * FROM user WHERE `username`= ? AND `password`= ? ";
  console.log([req.body.username,req.body.password]);
  db.query(sql, [ req.body.username,req.body.password], (err, data) => {
      if(err) {
          return res.json("Error");
      }
      if(data.length > 0) {
        // console.log(data[0].Name + '' +data[0].lastName);

          return res.json(data[0].Name + ' ' +data[0].lastName);
      }
      else{
          return res.json("fail");
      }

  })
} )

// Define User Model
// const Patient = sequelize.define('Patient', {
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   gender:{
//     type:DataTypes.ENUM,
//     values:['male','female']
//   },
//   birthDate: {
//     type: DataTypes.INTEGER,
//     validate: {
//       min: 0
//     }
//   },
//   phoneNumber: {
//     type: DataTypes.STRING,
//     allowNull:false
//     // unique: true, 
//     // validate: {
//     //   isEmail: true
//     // }
//   },
//   sickness: {
//     type: DataTypes.STRING,
//   }

// }, {
//   // Other model options go here
//   tableName: 'patients', // Specify the exact table name
//   timestamps: true // Adds createdAt and updatedAt
// });

// Sync database (create table if not exists)
// sequelize.sync()
//   .then(() => console.log('Database & tables created!'))
//   .catch(err => console.error('Unable to create table : ', err));

// API Routes for Users
app.get('/api/patientsHome', async (req, res) => {
  try {
    
    // Find all users
    db.query("select * from patient where deleted =0 limit 10",function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.json(result);
    } );
    // console.log(users);
    // res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});

app.get('/api/total/Rendez-vous', async (req, res) => {
  try {
    
    // Find all users
    db.query("select count(*) as count from rdv",function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.json(result);
    } );
    // console.log(users);
    // res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});

app.get('/api/total/Patients', async (req, res) => {
  try {
    
    // Find all users
    db.query("select count(*) as count from patient",function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.json(result);
    } );
    // console.log(users);
    // res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});

app.get('/api/total/Consultations', async (req, res) => {
  try {
    
    // Find all users
    db.query("select count(*) as count from consultation",function (err, result) {
      if (err) throw err;
      // console.log(result);
      res.json(result);
    } );
    // console.log(users);
    // res.json(users);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching users', 
      error: error.message 
    });
  }
});



// Route to create a new user
// app.post('/api/patients', async (req, res) => {
//   try {
//     const newPatient = await Patient.create({
//       firstName: req.body.firstName || 'John',
//       lastName: req.body.lastName || 'Doe',
//       gender: req.body.gender || 'male',
//       birthDate: req.body.birthDate || 30,
//       phoneNumber: req.body.phoneNumber || `05 00 00 00 00`,
//       sickness: req.body.sickness || ''
//     });

//     res.status(201).json(newPatient);
//   } catch (error) {
//     res.status(400).json({ 
//       message: 'Error creating user', 
//       error: error.message 
//     });
//   }
// });

// Database connection test route
app.get('/api/db-test', async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ message: 'Database connection successful!' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Unable to connect to the database', 
      error: error.message 
    });
  }
});


app.get('/api/getRdvToday',async (req,res)=>{
  // var con = mysql.createConnection({
  //   host : process.env.DB_HOST,
  //   database:process.env.DB_NAME,
  //   user : process.env.DB_USER,
  //   password : process.env.DB_PASSWORD,
  // });
  let currentDate = new Date().toJSON().slice(0, 10);
  let query = `
    select gender,count(*) as count from (
      select patient.patientsexe as gender from patient
      inner join (select * from rdv where day='` + currentDate + `') as subsub on subsub.patientid=patient.patientid
    ) AS subquery
    group by gender`;
  db.query(query, function (err, result) {
    if (err) throw err;
    
    let total=0;
    for(let i=0;i<result.length;i++){
      total+=result[i]['count'];
    }
    result.push({gender:"total",count:total})
    res.json(result);
  } );
  // con.end();
})

app.get('/api/patients-per-day',async (req,res)=>{
  function getWeekDates() {
    const startDate = new Date();
    const dayOfWeek = startDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Adjust to get the start of the week (Sunday)
    const startOfWeek = new Date(startDate);
    startOfWeek.setDate(startDate.getDate() - dayOfWeek);
    
    // Generate an array of dates for the week
    const weekDates = [];
    for(let i=0;i<7;i++){
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(currentDate.toISOString().split('T').slice(0,10)[0]);
    }
    
    return weekDates;
  } 

  const weekDates = getWeekDates();
  
  // var con = mysql.createConnection({
  //   host : process.env.DB_HOST,
  //   database:process.env.DB_NAME,
  //   user : process.env.DB_USER,
  //   password : process.env.DB_PASSWORD,
  // });

  let query =`
    select day,count(*) as count from (SELECT *
    FROM rdv
    WHERE day BETWEEN ? AND ?) as sub
    group by day order by day asc;
  `;

  const values = [weekDates[0],weekDates[6]];

  let finalResult=[
    { "Day": "Dim", "count": 0 },
    { "Day": "Lun", "count": 0 },
    { "Day": "Mar", "count": 0 },
    { "Day": "Mer", "count": 0 },
    { "Day": "Jeu", "count": 0 },
    { "Day": "Ven", "count": 0 },
    { "Day": "Sam", "count": 0 },
  ]

  function mapToDays(result){
    let j=0;

    console.log(result);
    for(let i=0;i<7;i++){
      
      if(weekDates[i]==result[j]['Day']){
        finalResult[i]['count']=result[j]['count'];
        j++;
      }
    }
  }

  db.query(query,values,(err ,result)=>{
    if (err) throw err;
    // console.log(result);
    if(result.length==0){

    }else{
      
      mapToDays(result);
    }
    // console.log(finalResult);
    res.json(finalResult);
  });


})




app.get('/api/consultations/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  
  const query = `
    SELECT 
      ConsultID, 
      PatientID, 
      ConsultAmount as prix, 
      ConsultType as type, 
      ConsultDescription as description, 
      DATE_FORMAT(ConsultDate, '%Y-%m-%d') as date, 
      TIME_FORMAT(ConsultHour, '%H:%i') as hour
    FROM consultation 
    WHERE PatientID = ?
  `;
  
  db.query(query, [patientId], (error, results) => {
    if (error) {
      console.error('Error fetching consultations:', error);
      res.status(500).json({ error: 'An error occurred while fetching consultations' });
      return;
    }
    res.json(results);
  });
});

// NEW: POST route to add a new consultation
app.post('/api/consultations', (req, res) => {
  const { 
    PatientID, 
    ConsultType, 
    ConsultDescription, 
    ConsultAmount, 
    ConsultDate, 
    ConsultHour 
  } = req.body;

  const query = `
    INSERT INTO consultation 
    (PatientID, ConsultType, ConsultDescription, ConsultAmount, ConsultDate, ConsultHour) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    PatientID, 
    ConsultType, 
    ConsultDescription, 
    ConsultAmount, 
    ConsultDate, 
    ConsultHour
  ];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error adding consultation:', error);
      res.status(500).json({ 
        error: 'An error occurred while adding consultation',
        details: error.message 
      });
      return;
    }
    
    // Return the newly inserted consultation with its ID
    res.status(201).json({
      message: 'Consultation added successfully',
      consultationId: results.insertId
    });
  });
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


app.get('/api/latest-patient-id', (req, res) => {
  const query = 'SELECT PatientID FROM Patient ORDER BY PatientID DESC LIMIT 1';
  db.query(query, (err, result) => {
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

  db.query(query, [fullName, sexe, birthDate, phoneNumber, sickness, ancientMedicament], (err, result) => {
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
  db.query(query, [patientId], (err, results) => {
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


async function fetchAppointments() {
  const sqlQuery = `
    SELECT 
        patient.PatientID, 
        patient.PatientFullName, 
        rdv.RDV_ID, 
        rdv.Day, 
        rdv.Hour 
    FROM 
        patient 
    JOIN 
        rdv 
    ON 
        patient.PatientID = rdv.PatientID 
  `;
  console.log("Executing SQL query:", sqlQuery);

  try {
    const [results] = await connection.query(sqlQuery);
    console.log("Query result:", results);
    const formattedResults = results.map(appointment => {
      const formattedDay = new Date(appointment.Day).toISOString().split('T')[0];
      return {
        ...appointment,
        Day: formattedDay
      };
    });

    return formattedResults;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}

// Create new appointment
async function createAppointment(appointmentData) {
  const { patientID, day, hour } = appointmentData;
  const formattedDay = new Date(day).toISOString().split('T')[0]; 

  const sqlQuery = `
    INSERT INTO rdv (PatientID, Day, Hour)
    VALUES (?, ?, ?)
  `;

  try {
    const [results] = await connection.query(sqlQuery, [patientID, formattedDay, hour]);
    console.log("Appointment created with ID:", results.insertId);
    return { id: results.insertId, patientID, day: formattedDay, hour };
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
}

// Update existing appointment
async function updateAppointment(appointmentId, appointmentData) {
  const { patientID, day, hour } = appointmentData;
  const formattedDay = new Date(day).toISOString().split('T')[0];

  const sqlQuery = `
    UPDATE rdv r
    JOIN patient p ON r.PatientID = p.PatientID
    SET r.PatientID = ?, r.Day = ?, r.Hour = ?
    WHERE r.RDV_ID = ?
  `;

  try {
    const [results] = await connection.query(sqlQuery, [patientID, formattedDay, hour, appointmentId]);

    if (results.affectedRows > 0) {
      const [updatedAppointment] = await connection.query(`
        SELECT 
            r.RDV_ID, 
            r.PatientID, 
            r.Day, 
            r.Hour, 
            p.PatientFullName 
        FROM 
            rdv r
        JOIN 
            patient p ON r.PatientID = p.PatientID
        
      `, [appointmentId]);

      return updatedAppointment[0];
    } else {
      throw new Error('Appointment not found or no changes made');
    }
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
}

// Delete appointment
async function deleteAppointment(appointmentId) {
  const sqlQuery = `
    DELETE FROM rdv WHERE RDV_ID = ?
  `;
  try {
    const [results] = await connection.query(sqlQuery, [appointmentId]);
    if (results.affectedRows > 0) {
      return { success: true };
    } else {
      throw new Error('Appointment not found');
    }
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
}

// API routes
// Add these new endpoints to your Express backend

// Get all appointments
app.get('/appointments', (req, res) => {
  const query = `
    SELECT 
      r.RDV_ID,
      r.PatientID,
      r.Day,
      r.Hour,
      p.PatientFullName
    FROM rdv r
    LEFT JOIN patient p ON r.PatientID = p.PatientID
    WHERE r.deleted = 0 OR r.deleted IS NULL
  `;
  
  db.query(query, (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ 
        error: 'Error fetching appointments',
        details: error.message 
      });
    }
    
    try {
      // Format dates and ensure all fields are present
      const formattedResults = results.map(row => ({
        RDV_ID: row.RDV_ID, // Make sure this matches the database column name exactly
        PatientID: row.PatientID,
        PatientFullName: row.PatientFullName || 'Unknown',
        Day: row.Day ? new Date(row.Day).toISOString().split('T')[0] : null,
        Hour: row.Hour
      }));
      
      res.json(formattedResults);
    } catch (err) {
      console.error('Data formatting error:', err);
      res.status(500).json({ 
        error: 'Error formatting appointment data',
        details: err.message 
      });
    }
  });
});


// Create new appointment
// Create new appointment
app.post('/appointments', (req, res) => {
  const { patientID, day, hour } = req.body;
  
  // Validate required fields
  if (!patientID || !day || !hour) {
    return res.status(400).json({ 
      error: 'Tous les champs sont requis',
      required: ['patientID', 'day', 'hour'],
      received: req.body 
    });
  }

  // First check if patient exists
  const checkPatientQuery = 'SELECT PatientID FROM patient WHERE PatientID = ?';
  db.query(checkPatientQuery, [patientID], (patientError, patientResults) => {
    if (patientError) {
      console.error('Error checking patient:', patientError);
      return res.status(500).json({ error: 'Erreur lors de la vérification du patient' });
    }

    if (patientResults.length === 0) {
      return res.status(404).json({ error: 'Patient non trouvé' });
    }

    // Then check if slot is available
    const checkSlotQuery = 'SELECT RDV_ID FROM rdv WHERE Day = ? AND Hour = ? AND (deleted = 0 OR deleted IS NULL)';
    db.query(checkSlotQuery, [day, hour], (slotError, slotResults) => {
      if (slotError) {
        console.error('Error checking slot:', slotError);
        return res.status(500).json({ error: 'Erreur lors de la vérification de disponibilité' });
      }

      if (slotResults.length > 0) {
        return res.status(409).json({ error: 'Ce créneau est déjà réservé' });
      }

      // Finally, create the appointment
      const insertQuery = `
        INSERT INTO rdv (PatientID, Day, Hour, deleted) 
        VALUES (?, ?, ?, 0)
      `;
      
      db.query(insertQuery, [patientID, day, hour], (insertError, result) => {
        if (insertError) {
          console.error('Error creating appointment:', insertError);
          return res.status(500).json({ 
            error: 'Erreur lors de la création du rendez-vous',
            details: insertError.message 
          });
        }
        
        res.status(201).json({
          message: 'Rendez-vous créé avec succès',
          appointmentId: result.insertId
        });
      });
    });
  });
});

// Update appointment
app.put('/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { patientID, day, hour } = req.body;
  
  const query = `
    UPDATE rdv 
    SET PatientID = ?, Day = ?, Hour = ?
    WHERE RDV_ID = ? AND (deleted = 0 OR deleted IS NULL)
  `;
  
  db.query(query, [patientID, day, hour, id], (error, result) => {
    if (error) {
      console.error('Error updating appointment:', error);
      return res.status(500).json({ error: 'Error updating appointment' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment updated successfully' });
  });
});

// Delete appointment
app.delete('/appointments/:id', (req, res) => {
  const id = req.params.id;
  
  if (!id || id === 'undefined') {
    return res.status(400).json({ error: 'Invalid appointment ID' });
  }
  
  const query = 'UPDATE rdv SET deleted = 1 WHERE RDV_ID = ?';
  
  db.query(query, [id], (error, result) => {
    if (error) {
      console.error('Error deleting appointment:', error);
      return res.status(500).json({ error: 'Error deleting appointment' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json({ message: 'Appointment deleted successfully' });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
