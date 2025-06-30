// import '@fortawesome/fontawesome-free/css/all.min.css';
// import React, { useState } from 'react';
// import axios from 'axios';

// const SearchPatient = () => {
//     const [patientId, setPatientId] = useState('');
//     const [patientData, setPatientData] = useState(null);
//     const [error, setError] = useState('');

//     const handleSearch = () => {
//         if (patientId.trim() === '') {
//             setError('Please enter a patient ID');
//             return;
//         }

//         axios
//             .get(`http://localhost:8080/api/patient/${patientId}`)
//             .then((response) => {
//                 setPatientData(response.data);
//                 setError('');
//             })
//             .catch((err) => {
//                 setError('Patient not found or error occurred.');
//                 setPatientData(null);
//             });
//     };

//     return (
//         <div className="Search-row">
//           <div className='Search-row1'>
//             <input
//                 className="Search"
//                 value={patientId}
//                 onChange={(e) => setPatientId(e.target.value)}
//                 type="text"
//                 placeholder="Search by Patient ID..."
//             />
//             {/* <button className="searchicon" onClick={handleSearch}><i className="fas fa-search "></i></button> */}
//             </div>
//             {error && <div>{error}</div>}
//             {patientData && (
//                 <div>
//                     <h3>Patient Details:</h3>
//                     <p>ID: {patientData.PatientID}</p>
//                     <p>Name: {patientData.PatientFullName}</p>
//                     <p>Phone: {patientData.PatientPhoneNumber}</p>
//                 </div>
//             )}
//             <div className="buttons">
//                 <button type="button">
//                     Nouveau <i className="fas fa-plus-circle"></i>
//                 </button>
//                 <button type="button">
//                     Modifier <i className="fas fa-edit"></i>
//                 </button>
//                 <button className="delete" type="button">
//                     Supprimer <i className="fas fa-minus-circle"></i>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SearchPatient;
