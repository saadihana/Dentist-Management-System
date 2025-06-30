// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// const UpdatePatientForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { patient } = location.state;

//   const [formData, setFormData] = useState({
//     PatientFullName: patient.PatientFullName,
//     PatientSexe: patient.PatientSexe,
//     PatientBirthDate: patient.PatientBirthDate.slice(0, 10),
//     PatientPhoneNumber: patient.PatientPhoneNumber,
//     PatientSickness: patient.PatientSickness,
//     PatientAncientMedicament: patient.PatientAncientMedicament,
//     PatientTotalAmount: patient.PatientTotalAmount,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/patients/${patient.PatientID}`, formData);
//       alert("Patient updated successfully!");
//       navigate("/patients");
//     } catch (error) {
//       console.error("Error updating patient:", error);
//       alert("Failed to update patient. Please try again.");
//     }
//   };

//   return (
//     <div className="container">
//       <div className="form-container">
//         <form onSubmit={handleSubmit}>
//           <h2>Update Patient Information</h2>
          
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="PatientFullName"
//             value={formData.PatientFullName}
//             onChange={handleChange}
//           />

//           <label>Sexe</label>
//           <input
//             type="text"
//             name="PatientSexe"
//             value={formData.PatientSexe}
//             onChange={handleChange}
//           />

//           <label>Birth Date</label>
//           <input
//             type="date"
//             name="PatientBirthDate"
//             value={formData.PatientBirthDate}
//             onChange={handleChange}
//           />

//           <label>Phone Number</label>
//           <input
//             type="text"
//             name="PatientPhoneNumber"
//             value={formData.PatientPhoneNumber}
//             onChange={handleChange}
//           />

//           <label>Sickness</label>
//           <input
//             type="text"
//             name="PatientSickness"
//             value={formData.PatientSickness}
//             onChange={handleChange}
//           />

//           <label>Ancient Medicament</label>
//           <input
//             type="text"
//             name="PatientAncientMedicament"
//             value={formData.PatientAncientMedicament}
//             onChange={handleChange}
//           />

//           <label>Total Amount</label>
//           <input
//             type="number"
//             name="PatientTotalAmount"
//             value={formData.PatientTotalAmount}
//             onChange={handleChange}
//           />

//           <div className="button-container">
//             <button type="submit">Update</button>
//             <button 
//               type="button" 
//               onClick={() => navigate('/patients')}
//               className="cancel-button"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdatePatientForm;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const UpdatePatientForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient } = location.state;

  const [formData, setFormData] = useState({
    PatientFullName: patient.PatientFullName,
    PatientSexe: patient.PatientSexe,
    PatientBirthDate: patient.PatientBirthDate.slice(0, 10),
    PatientPhoneNumber: patient.PatientPhoneNumber,
    PatientSickness: patient.PatientSickness,
    PatientAncientMedicament: patient.PatientAncientMedicament,
    PatientTotalAmount: patient.PatientTotalAmount,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/patients/${patient.PatientID}`, formData);
      alert("Patient updated successfully!");
      navigate("/patients");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Update Patient Information</h2>
          
          <label>Full Name</label>
          <input
            type="text"
            name="PatientFullName"
            value={formData.PatientFullName}
            onChange={handleChange}
          />

          <label>Sexe</label>
          <input
            type="text"
            name="PatientSexe"
            value={formData.PatientSexe}
            onChange={handleChange}
          />

          <label>Birth Date</label>
          <input
            type="date"
            name="PatientBirthDate"
            value={formData.PatientBirthDate}
            onChange={handleChange}
          />

          <label>Phone Number</label>
          <input
            type="text"
            name="PatientPhoneNumber"
            value={formData.PatientPhoneNumber}
            onChange={handleChange}
          />

          <label>Sickness</label>
          <input
            type="text"
            name="PatientSickness"
            value={formData.PatientSickness}
            onChange={handleChange}
          />

          <label>Ancient Medicament</label>
          <input
            type="text"
            name="PatientAncientMedicament"
            value={formData.PatientAncientMedicament}
            onChange={handleChange}
          />

          <label>Total Amount</label>
          <input
            type="number"
            name="PatientTotalAmount"
            value={formData.PatientTotalAmount}
            onChange={handleChange}
          />

          <div className="button-container">
            <button type="submit">Update</button>
            <button 
              type="button" 
              onClick={() => navigate('/patients')}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          background: linear-gradient(135deg, #e8f4f8, #d0e8f2);
          width: 100vw;
          height: 100vh;
          padding: 20px;
          overflow-y: auto;
        }

        .form-container {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          width: 50%;
          max-width: 1200px;
          border: 1px solid #ddd;
          border-radius: 12px;
          padding: 20px;
          background: #ffffffee;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          animation: fadeIn 1s ease-in-out;
          margin-top: 55px;
        }

        form {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 40px;
          background: linear-gradient(135deg, #f9f9f9, #ffffff);
          border: 1px solid #ddd;
          border-radius: 12px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #0066ba;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 30px;
          text-align: center;
        }

        label {
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
          font-size: 0.9rem;
          display: block;
          margin-top: 15px;
        }

        input {
          width: 100%;
          padding: 12px;
          font-size: 0.9rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          transition: all 0.3s ease;
          margin-bottom: 15px;
          box-sizing: border-box;
        }

        input:focus {
          border-color: #0066ba;
          box-shadow: 0px 0px 5px rgba(0, 102, 186, 0.5);
          outline: none;
        }

        input:hover {
          border-color: #0066ba;
        }

        input[type="date"] {
          cursor: pointer;
          color: #333;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }

        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .button-container {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 30px;
        }

        button {
          padding: 12px 25px;
          border: none;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: bold;
          cursor: pointer;
          background-color: #0066ba;
          color: white;
          min-width: 120px;
          transition: all 0.3s ease;
        }

        button:hover {
          transform: scale(1.05);
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
        }

        button:active {
          transform: scale(0.98);
        }

        .cancel-button {
          background-color: #f44336;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        input.error {
          border-color: #f44336;
          background-color: #fff8f8;
        }

        .error-message {
          color: #f44336;
          font-size: 0.8rem;
          margin-top: -10px;
          margin-bottom: 10px;
        }

        input.success {
          border-color: #4caf50;
          background-color: #f8fff8;
        }

        button:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          transform: none;
        }

        button.loading {
          cursor: wait;
          opacity: 0.8;
        }

        @media screen and (max-width: 768px) {
          .form-container {
            width: 90%;
            padding: 15px;
          }

          form {
            padding: 20px;
          }

          input {
            padding: 10px;
          }

          .button-container {
            flex-direction: column;
            align-items: center;
          }

          button {
            width: 100%;
            max-width: 200px;
          }
        }

        @media print {
          .container {
            background: none;
            padding: 0;
            height: auto;
          }

          .form-container {
            box-shadow: none;
            border: none;
            padding: 0;
          }

          form {
            box-shadow: none;
            padding: 20px;
            background: white;
          }

          input {
            border: none;
            font-size: 1rem;
            color: #0066ba;
            background: none;
            padding: 5px;
          }

          h2 {
            font-size: 1.2rem;
            color: #333;
            margin-bottom: 30px;
          }

          .button-container {
            display: none !important;
          }

          label {
            page-break-inside: avoid;
            margin-bottom: 10px;
          }
        }

        @media (prefers-contrast: high) {
          .container {
            background: white;
          }

          form {
            background: white;
            border: 2px solid black;
          }

          input {
            border: 2px solid black;
          }

          label {
            color: black;
          }

          button {
            border: 2px solid black;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .form-container {
            animation: none;
          }

          button:hover {
            transform: none;
          }

          input, button {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
};

export default UpdatePatientForm;