import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [Patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPatient, setNewPatient] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phoneNumber: '',
    sickness:''
  });

  // Fetch Patients when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
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

  // Function to add a new patient
  const handleAddpatient = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patients', newPatient);
      setPatients([...Patients, response.data]);
      // Reset form
      setNewPatient({
        firstName: '',
        lastName: '',
        gender:'',
        birthDate: '',
        phoneNumber: '',
        sickness:''
      });
    } catch (err) {
      setError('Failed to add patient');
      console.error('Error adding patient:', err);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) return <div>Loading Patients...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>patient List</h1>
      
      {/* patient Creation Form */}
      <form onSubmit={handleAddpatient}>
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
      </form>

      {/* patient Table */}
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>birthDate</th>
            <th>Phone Number</th>
            <th>Sickness</th>
          </tr>
        </thead>
        <tbody>
          {Patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.firstName}</td>
              <td>{patient.lastName}</td>
              <td>{patient.gender}</td>
              <td>{patient.birthDate}</td>
              <td>{patient.phoneNumber}</td>
              <td>{patient.sickness}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;