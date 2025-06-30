import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/table.css';
import { Navigate, useNavigate } from "react-router-dom";

const PatientList = () => {
  const navigate = useNavigate();
  const [Patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [newPatient, setNewPatient] = useState({
  //   id:0,
  //   name: '',
  //   gender:'',
  //   birthDate: '',
  //   phoneNumber: '',
  //   sickness:'',
  //   PatientAncientMedicament: '',
  //   PatientTotalAmount: 0
  // });


  // Fetch Patients when component mounts
  useEffect(() => {

    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patientsHome');
        setPatients(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch patients');
        setLoading(false);
        console.error('Error fetching Patients:', err);
      }
    };
    fetchPatients();
  }, []);

  // // Function to add a new patient
  // const handleAddpatient = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/patients', newPatient);
  //     setPatients([...Patients, response.data]);
  //     // Reset form
  //     setNewPatient({
  //       id:0,
  //       name: '',
  //       gender:'',
  //       birthDate: '',
  //       phoneNumber: '',
  //       sickness:'',
  //       PatientAncientMedicament: 'Sertraline',
  //       PatientTotalAmount: '60.00'
  //     });
  //   } catch (err) {
  //     setError('Failed to add patient');
  //     console.error('Error adding patient:', err);
  //   }
  // };

  // Handle input changes
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewPatient(prev => ({
  //     ...prev,
  //     [name]: value
  //   }));
  // };

  if (loading) return <div>Loading Patients...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className='table-container'>
      {/* patient Creation Form */}
      {/* <form onSubmit={handleAddpatient}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newPatient.firstName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newPatient.lastName}
          onChange={handleInputChange}
        />
        <select name="gender" id="" value={newPatient.lastName} onChange={handleInputChange}>
            <option value="" selected disabled></option>
            <option value="male" >Male</option>
            <option value="female">Female</option>
        </select>
        <input
          type="date"
          name="birthDate"
          placeholder="birthDate"
          value={newPatient.birthDate}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={newPatient.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="sickness"
          placeholder="Sickness"
          value={newPatient.sickness}
          onChange={handleInputChange}
        />
        <button type="submit">Add patient</button>
      </form> */}

      {/* patient Table */}

      <div style={{ display: "flex", alignItems: "center", gap: "100px", marginTop:"10px" }}>
  <h4 style={{ margin: 0 }}>Liste de patients</h4>
  <button
    type="button"
    onClick={() => navigate('/patient-form')}
    style={{
      backgroundColor: "#0066ba",
      color: "white",
      padding: "5px 10px",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
    }}
  >
    Nouveau Patient
    {/* <i className="fas fa-plus-circle icc"></i> */}
  </button>
</div>

      <table className='user-table'>
        <thead>
          <tr>
            <th>N°</th>
            {/* <th>First Name</th> */}
            <th>Name</th>
            <th>Sexe</th>
            <th>Date N</th>
            <th>Numero Tel</th>
            <th>Sickness</th>
            <th>Sickness</th>
            <th>Sickness</th>
          </tr>
        </thead>
        <tbody>
          {Patients.map((patient) => (
            <tr key={patient.id} onClick={()=>{
              navigate('/patientRecord',{state:{
                fullname:patient.PatientFullName,
                dateNaissance:patient.PatientBirthDate.slice(0,10),
                patientId:patient.PatientID}})
            }}>
              <td>{patient.PatientID}</td>
              {/* <td>{patient.firstName}</td> */}
              <td>{patient.PatientFullName}</td>
              <td>{patient.PatientSexe}</td>
              <td>{patient.PatientBirthDate.slice(0,10)}</td>
              <td>{patient.PatientPhoneNumber}</td>
              <td>{patient.PatientSickness}</td>
              <td>{patient.PatientAncientMedicament}</td>
              <td>{patient.PatientTotalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




export default PatientList;