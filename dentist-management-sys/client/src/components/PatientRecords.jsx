// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import './PatientRecords.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import PatientForm from "./PatientForm";

// const PatientTable = () => {
//   const [patients, setPatients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [selectedPatientId, setSelectedPatientId] = useState(null);

//   const navigate = useNavigate();

//   // Fetch patients from the API
//   useEffect(() => {
//     axios
//       .get("http://localhost:8081/api/patients")
//       .then((response) => {
//         setPatients(response.data);
//         setFilteredPatients(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   // Update filtered patients when search term changes
//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredPatients(patients);
//     } else {
//       const filtered = patients.filter((patient) =>
//         patient.PatientFullName.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredPatients(filtered);
//     }
//   }, [searchTerm, patients]);

// // Handle patient modification
// const handleModification = async () => {
//   if (selectedPatientId) {
//     const selectedPatient = patients.find(patient => patient.PatientID === selectedPatientId);
//     if (selectedPatient) {
//       // Modify the patient by setting 'modified' to 1
//       const updatedPatient = {
//         ...selectedPatient,
//         modified: 1
//       };

//       try {
//         // Send the updated patient data to the server
//         await axios.put(`http://localhost:8081/api/patients/${selectedPatient.PatientID}`, updatedPatient);

//         // Update the state with the modified patient
//         setPatients((prevPatients) => prevPatients.map(p =>
//           p.PatientID === selectedPatient.PatientID ? { ...p, ...updatedPatient } : p
//         ));
//         setFilteredPatients((prevPatients) => prevPatients.map(p =>
//           p.PatientID === selectedPatient.PatientID ? { ...p, ...updatedPatient } : p
//         ));
//         alert('Patient updated successfully!');
//       } catch (error) {
//         console.error("Error updating patient:", error);
//         alert("Failed to update patient. Please try again.");
//       }
//     }
//   } else {
//     alert("Please select a patient to modify.");
//   }
// };


//   // Handle patient deletion
//   const handleDelete = async () => {
//     if (selectedPatientId) {
//       const selectedPatient = patients.find(patient => patient.PatientID === selectedPatientId);
//       if (selectedPatient) {
//         try {
//           await axios.put(`http://localhost:8081/api/patients/${selectedPatient.PatientID}`, {
//             deleted: 1, // Mark the patient as deleted
//           });
//           setPatients(prevPatients => prevPatients.filter(patient => patient.PatientID !== selectedPatient.PatientID));
//           setFilteredPatients(prevPatients => prevPatients.filter(patient => patient.PatientID !== selectedPatient.PatientID));
//           alert(`Patient ${selectedPatient.PatientFullName} has been deleted.`);
//         } catch (error) {
//           console.error("Error deleting patient:", error);
//           alert("Failed to delete patient. Please try again.");
//         }
//       }
//     } else {
//       alert("Please select a patient to delete.");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <div className="Search-row">
//         <div className="Search-row1">
//           <input
//             type="text"
//             placeholder="Search by Full Name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             style={{ marginBottom: "10px", padding: "8px", width: "500px", borderRadius: "10px" }}
//           />
//         </div>
//         <div className="buttons">
//           <button type="button" onClick={() => navigate('/patient-form')}>
//             Nouveau <i className="fas fa-plus-circle icc"></i>
//           </button>
//           <button type="button" onClick={handleModification}>
//             Modifier <i className="fas fa-edit icc"></i>
//           </button>
//           <button
//             className="delete"
//             onClick={handleDelete}
//             type="button"
//             disabled={!selectedPatientId}
//           >
//             Supprimer <i className="fas fa-minus-circle"></i>
//           </button>
//         </div>
//       </div>
//       <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Full Name</th>
//             <th>Sexe</th>
//             <th>Birth Date</th>
//             <th>Phone Number</th>
//             <th>Sickness</th>
//             <th>Ancient Medicament</th>
//             <th>Total Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPatients.length === 0 ? (
//             <tr>
//               <td colSpan="8">No results found</td>
//             </tr>
//           ) : (
//             filteredPatients.map((patient) => (
//               <tr
//                 key={patient.PatientID}
//                 className={patient.PatientID === selectedPatientId ? "selected" : ""}
//                 onClick={() => setSelectedPatientId(patient.PatientID)}
//               >
//                 <td>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedPatientId(patient.PatientID)}
//                     className="IDbutton"
//                   >
//                     {patient.PatientID}
//                   </button>
//                 </td>
//                 <td>{patient.PatientFullName}</td>
//                 <td>{patient.PatientSexe}</td>
//                 <td>{patient.PatientBirthDate}</td>
//                 <td>{patient.PatientPhoneNumber}</td>
//                 <td>{patient.PatientSickness}</td>
//                 <td>{patient.PatientAncientMedicament}</td>
//                 <td>{patient.PatientTotalAmount}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default PatientTable;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../styles/PatientRecords.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import PatientForm from "./PatientForm";
import Header from "./HeaderPatientTable";

const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigate = useNavigate();

  // Fetch patients from the API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((response) => {
        setPatients(response.data);
        setFilteredPatients(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Update filtered patients when search term changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter((patient) =>
        patient.PatientFullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [searchTerm, patients]);

  // Handle patient modification
  // const handleModification = async () => {
  //   if (selectedPatientId) {
  //     const selectedPatient = patients.find(patient => patient.PatientID === selectedPatientId);
  //     if (selectedPatient) {
  //       const updatedPatient = {
  //         ...selectedPatient,
  //         modified: 1 // Mark as modified
  //       };

  //       try {
  //         await axios.put(`http://localhost:5000/api/patients/${selectedPatient.PatientID}`, updatedPatient);
  //         setPatients((prevPatients) =>
  //           prevPatients.map((p) =>
  //             p.PatientID === selectedPatient.PatientID ? { ...p, ...updatedPatient } : p
  //           )
  //         );
  //         setFilteredPatients((prevPatients) =>
  //           prevPatients.map((p) =>
  //             p.PatientID === selectedPatient.PatientID ? { ...p, ...updatedPatient } : p
  //           )
  //         );
  //         alert('Patient updated successfully!');
  //       } catch (error) {
  //         console.error("Error updating patient:", error);
  //         alert("Failed to update patient. Please try again.");
  //       }
  //     }
  //   } else {
  //     alert("Please select a patient to modify.");
  //   }
  // };
  // const handleModification = () => {
  //   if (selectedPatientId) {
  //     const selectedPatient = patients.find(patient => patient.PatientID === selectedPatientId);
  //     if (selectedPatient) {
  //       navigate('/patient-form', { state: { patient: selectedPatient } });
  //     }
  //   } else {
  //     alert("Please select a patient to modify.");
  //   }
  // };

  const handleModification = () => {
    if (selectedPatientId) {
      const selectedPatient = patients.find(patient => patient.PatientID === selectedPatientId);
      if (selectedPatient) {
        navigate('/update-patient', { state: { patient: selectedPatient } });
      }
    } else {
      alert("Please select a patient to modify.");
    }
  };


  // Handle patient deletion
  const handleDelete = async () => {
    if (selectedPatientId) {
      const selectedPatient = patients.find(patient => patient.PatientID === selectedPatientId);
      if (selectedPatient) {
        try {
          await axios.put(`http://localhost:5000/api/patients/${selectedPatient.PatientID}/delete`);
          setPatients(prevPatients => prevPatients.filter(patient => patient.PatientID !== selectedPatient.PatientID));
          setFilteredPatients(prevPatients => prevPatients.filter(patient => patient.PatientID !== selectedPatient.PatientID));
          alert(`Patient ${selectedPatient.PatientFullName} has been deleted.`);
        } catch (error) {
          console.error("Error deleting patient:", error);
          alert("Failed to delete patient. Please try again.");
        }
      }
    } else {
      alert("Please select a patient to delete.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
      <div className="Search-row">
        <div className="Search-row1">
          <input
            type="text"
            placeholder="Recherche par Nom ou Prenom"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "10px", padding: "8px", width: "500px", borderRadius: "10px" , marginLeft:"30%"}}
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={() => navigate('/patient-form')} style={{backgroundColor:"#0066ba", color:"white"}}>
            Nouveau
            {/* <i className="fas fa-plus-circle icc"></i> */}
          </button>
          <button type="button" onClick={handleModification} style={{backgroundColor:"#0066ba", color:"white"}}>
            Modifier
            {/* <i className="fas fa-edit icc"></i> */}
          </button>
          <button
            className="delete"
            onClick={handleDelete}
            type="button"
            disabled={!selectedPatientId}
            style={{color:"white"}}
          >
            Supprimer
            {/* <i className="fas fa-minus-circle"></i> */}
          </button>
        </div>
      </div>
      <table border="1" style={{ width: "80%", borderCollapse: "collapse", marginLeft:"10%"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Sexe</th>
            <th>Birth Date</th>
            <th>Phone Number</th>
            <th>Sickness</th>
            <th>Ancient Medicament</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length === 0 ? (
            <tr>
              <td colSpan="8">No results found</td>
            </tr>
          ) : (
            filteredPatients.map((patient) => (
              <tr
                key={patient.PatientID}
                className={patient.PatientID === selectedPatientId ? "selected" : ""}
                onClick={() => setSelectedPatientId(patient.PatientID)}
              >
                <td>
                  <button
                    type="button"
                    onClick={() => setSelectedPatientId(patient.PatientID)}
                    className="IDbutton"
                  >
                    {patient.PatientID}
                  </button>
                </td>
                <td>{patient.PatientFullName}</td>
                <td>{patient.PatientSexe}</td>
                <td>{patient.PatientBirthDate.slice(0, 10)}</td>
                <td>{patient.PatientPhoneNumber}</td>
                <td>{patient.PatientSickness}</td>
                <td>{patient.PatientAncientMedicament}</td>
                <td>{patient.PatientTotalAmount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientTable;
