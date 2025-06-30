import React, { useState, useEffect } from 'react';
import { Database, Calendar, Clock, FileText, Plus, X } from 'lucide-react';
import DreamSmile from '../assets/dreamsmile.png';
import '../styles/patientRecord.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
// import { Modal } from 'bootstrap';

const PatientRecord = () => {
  // const patientData = route.params;

  const location = useLocation();
  const patientData  = location.state || {};
  console.log(patientData);

  const [showForm, setShowForm] = useState(false);
  const [consultations, setConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [newConsultation, setNewConsultation] = useState({
    type: '',
    description: '',
    prix: ''
  });

  // Fetch consultations when component mounts
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/consultations/${patientData.patientId}");
        setConsultations(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching consultations:', err);
        setError('Failed to fetch consultations');
        setIsLoading(false);
      }
    };

    fetchConsultations();
  }, [patientData.patientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const now = new Date();
      const newEntry = {
        PatientID: patientData.patientId, // Ensure this matches the database column
        ConsultType: newConsultation.type,
        ConsultDescription: newConsultation.description,
        ConsultAmount: parseFloat(newConsultation.prix), // Ensure it's a number
        ConsultDate: now.toISOString().split('T')[0],
        ConsultHour: now.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: false 
        })
      };
  
      // Send new consultation to backend
      const response = await axios.post('http://localhost:5000/api/consultations', newEntry);
      
      // Update local state with the response
      setConsultations([...consultations, {
        date: newEntry.ConsultDate,
        hour: newEntry.ConsultHour,
        type: newEntry.ConsultType,
        description: newEntry.ConsultDescription,
        prix: newEntry.ConsultAmount
      }]);
  
      // Reset form
      setNewConsultation({ type: '', description: '', prix: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding consultation:', err.response ? err.response.data : err.message);
      alert('Failed to add consultation: ' + (err.response ? err.response.data.error : err.message));
    }
  };

  // Rest of the component remains the same as your original code
  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="main-card">
          
            <div className="header-content">
              
                
                <div>
                  <h1 className="header-title">Dossier Patient</h1>
                  <p className="header-subtitle">Cabinet Dentaire</p>
                  </div>
                  <div>
                  <button 
                onClick={() => setShowForm(!showForm)}
                className="new-consultation-btn"
              >
                {showForm ? <X size={16} /> : <Plus size={16} />}
                {showForm ? 'Fermer' : 'Nouvelle Consultation'}
              </button>
                </div>
              
              
            </div><div className="main-content">
            <div className="patient-info">
              <h2 className="patient-info-title">Informations Patient</h2>
              <div className="patient-info-grid">
                <div className="input-group">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={patientData.fullname}
                    readOnly
                    className="input-field"
                  />
                </div>
                <div className="input-group">
                  <label className="input-naissance" >Naissance</label>
                  <input
                    type="text"
                    value={patientData.dateNaissance}
                    readOnly
                    className="input-field"
                  />
                </div>
              </div>
            </div>

            {showForm && (
              <div className="consultation-form">
                <h2 className="form-title" >Nouvelle Consultation</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <div>
                      <label>Type de consultation</label>
                      <input
                        type="text"
                        value={newConsultation.type}
                        onChange={(e) => setNewConsultation({...newConsultation, type: e.target.value})}
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label>Prix de la consultation</label>
                      <input
                        type="text"
                        value={newConsultation.prix}
                        onChange={(e) => setNewConsultation({...newConsultation, prix: e.target.value})}
                        className="form-input"
                        placeholder="Ex: 1000 DA"
                      />
                    </div>
                  </div>
                  <div className="descr">
                    <label>Description</label>
                    <textarea
                      value={newConsultation.description}
                      onChange={(e) => setNewConsultation({...newConsultation, description: e.target.value})}
                      className="form-textarea"
                      rows="3"
                      required
                    />
                  </div>
                  <button type="submit" className="submit-btn">
                    Enregistrer la consultation
                  </button>
                </form>
              </div>
            )}

      {isLoading }
      {error && <p className="error">{error}</p>}<div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Historique des Consultations</h2>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div>
                    <Calendar size={14} />
                    Date
                  </div>
                </th>
                <th>
                  <div>
                    <Clock size={14} />
                    Heure
                  </div>
                </th>
                <th>
                  <div>
                    <FileText size={14} />
                    Type
                  </div>
                </th>
                <th>
                  <div>
                    <Database size={14} />
                    Prix de la consultation
                  </div>
                </th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consultation, index) => (
                <tr key={index}>
                  <td>{consultation.date}</td>
                  <td>{consultation.hour}</td>
                  <td>{consultation.type}</td>
                  <td>{consultation.prix}</td>
                  <td>{consultation.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
          </div>
        </div>
      </div>
    </div>);
};

export default PatientRecord;