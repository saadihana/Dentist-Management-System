import React, { useState, useEffect } from 'react';
import '../styles/PatientForm.css';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderForm from './HeaderForm.jsx';


function PatientForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialFormData = location.state?.patient
  ? {
      nom: location.state.patient.PatientFullName.split(" ")[0] || "",
      prenom: location.state.patient.PatientFullName.split(" ")[1] || "",
      sexe: location.state.patient.PatientSexe || "",
      birthDate: location.state.patient.PatientBirthDate || "",
      phoneNumber: location.state.patient.PatientPhoneNumber || "",
      sickness: location.state.patient.PatientSickness || "",
      ancientMedicament: location.state.patient.PatientAncientMedicament || "",
  }
  : {
      nom: "",
      prenom: "",
      sexe: "",
      birthDate: "",
      phoneNumber: "",
      sickness: "",
      ancientMedicament: "",
  };

  
    const [formData, setFormData] = useState(initialFormData);
    const [latestPatientID, setLatestPatientID] = useState("Loading...");

    // Fetch the latest PatientID
    useEffect(() => {
        fetch('http://localhost:5000/api/latest-patient-id')
            .then((response) => response.json())
            .then((data) => {
                if (data && data.latestPatientID) {
                    setLatestPatientID(data.latestPatientID);
                } else {
                    setLatestPatientID("Error");
                    console.error('Invalid response:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching latest PatientID:', error);
                setLatestPatientID("Error");
            });
    }, []);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Form data object
        const fullName = `${formData.nom} ${formData.prenom}`.trim();
    
        const submissionData = { 
            fullName: fullName,
            sexe: formData.sexe,
            birthDate: formData.birthDate,
            phoneNumber: formData.phoneNumber,
            sickness: formData.sickness,
            ancientMedicament: formData.ancientMedicament,
        };
    
        // Submit data to the backend
        fetch('http://localhost:5000/api/patients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to submit the form');
            }
            return response.json();
        })
        .then((data) => {
            alert('Patient data submitted successfully!');
            setFormData({
                nom: '',
                prenom: '',
                sexe: '',
                birthDate: '',
                phoneNumber: '',
                sickness: '',
                ancientMedicament: ''
            });
        })
        .catch((error) => {
            console.error('Error submitting form:', error);
            alert('There was an error submitting the form.');
        });
    };
    
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     //before submitting
    //     const fullName = `${formData.nom} ${formData.prenom}`.trim();

    //     const submissionData = { 
    //         ...formData, 
    //         fullName: fullName,
    //         PatientID: latestPatientID, 
    //     };

    //     fetch('http://localhost:5000/api/patients', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(submissionData),
    //     })
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error('Failed to submit the form');
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         alert('Patient data submitted successfully!');
    //         setFormData({
    //             nom: '',
    //             prenom: '',
    //             sexe: '',
    //             birthDate: '',
    //             phoneNumber: '',
    //             sickness: '',
    //             ancientMedicament: ''
    //         });
    //     })
    //     .catch((error) => {
    //         console.error('Error submitting form:', error);
    //         alert('There was an error submitting the form.');
    //     });
    // };

    return (
        <div className='app-container'>
            < HeaderForm />
            <div className='content'>
        <form className="patient-form" onSubmit={handleSubmit}>
            {/* Form Section 1 */}
            <div className="form-section1">
                <div className='FirstInputSection'>
                    <div className="form-group">
                        <label>N° Dossier</label>
                        <input
                            type="text"
                            name="dossier"
                            value={latestPatientID}
                            readOnly
                            className="Input-Dossier"
                        />
                    </div>

                    <div className="form-group">
                        <label>Sexe</label>
                        <div className='Sex-Input'>
                            <input
                                type="radio"
                                id="male"
                                name="sexe"
                                value="Masculin"
                                checked={formData.sexe === 'Masculin'}
                                onChange={handleChange}
                            />
                            <label htmlFor="male">Masculin</label>
                            <input
                                type="radio"
                                id="female"
                                name="sexe"
                                value="Feminin"
                                checked={formData.sexe === 'Feminin'}
                                onChange={handleChange}
                            />
                            <label htmlFor="female">Feminin</label>
                        </div>
                    </div>

                    {/* Nom and Prénom Fields */}
                    <div className="form-group">
                        <label>Nom</label>
                        <input
                            type="text"
                            name="nom"
                            className="form-control"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>Prénom</label>
                        <input
                            type="text"
                            name="prenom"
                            className="form-control"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Form Buttons */}
                <div className="form-buttons">
                    <button type="submit" className="validate-button">Valider</button>
                    <button type="button" className="cancel-button" onClick={() => setFormData({
                        nom: '',
                        prenom: '',
                        sexe: '',
                        birthDate: '',
                        phoneNumber: '',
                        sickness: '',
                        ancientMedicament: ''
                    })}>Annuler</button>
                    <button type="button" className="print-button" onClick={() => window.print()}>Imprimer</button>
                </div>
            </div>

            {/* Form Section 2 - General Info */}
            <div className="form-section2">
                <div className="form-section">
                    <h2>Infos Générales</h2>
                    <div className="form-group">
                        <label>Date de Naissance</label>
                        <input
                            type="date"
                            name="birthDate"
                            className="form-control"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Téléphone</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="form-control"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            pattern="^[0-9]{10}$"
                        />
                    </div>
                </div>

                {/* Form Section 3 - Medical Info */}
                <div className="form-section">
                    <h2>Infos Médicales</h2>
                    <div className="form-group">
                        <label>État Général</label>
                        <textarea
                            name="sickness"
                            className="form-control"
                            value={formData.sickness}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Médication Anciens</label>
                        <textarea
                            name="ancientMedicament"
                            className="form-control"
                            value={formData.ancientMedicament}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </div>
            </div>
        </form>
        <div className="Image">
          <img src="./Images/dentist.jpeg" alt="Dentist Image" />
        </div>
        </div>
        </div>
    );
}

export default PatientForm;
