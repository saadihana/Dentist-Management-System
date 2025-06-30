import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  addWeeks,
  subWeeks,
} from "date-fns";
import { fr } from "date-fns/locale";
import "../../../styles/Timetable.css";


function Timetable() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [displayText, setDisplayText] = useState({});
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(15);
  const [interval, setInterval] = useState(60);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    n_dossier: "",
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const weekStart = startOfWeek(currentWeek, { locale: fr });
  const weekEnd = endOfWeek(currentWeek, { locale: fr });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    refetchAppointments();
  }, []);

  const handleSlotClick = (date, time) => {
    const correctedDate = new Date(date);
    correctedDate.setDate(correctedDate.getDate());
    setSelectedDate(correctedDate);
    setSelectedSlot(time);
    
    // Find if there's an existing appointment for this slot
    const existingAppointment = appointments.find(
      (app) => app.Day === format(date, "yyyy-MM-dd") && app.Hour === time
    );
  
    if (existingAppointment) {
      console.log("Found existing appointment:", existingAppointment); // Debug log
      setFormData({
        n_dossier: existingAppointment.PatientID,
      });
      setSelectedAppointment(existingAppointment);
    } else {
      setFormData({ n_dossier: "" });
      setSelectedAppointment(null);
    }
    
    setIsFormVisible(true);
  };

  const handleSave = async () => {
    if (!formData.n_dossier) {
      alert("Veuillez remplir le champ N° Dossier.");
      return;
    }
  
    const appointmentData = {
      patientID: formData.n_dossier,
      day: format(selectedDate, "yyyy-MM-dd"),
      hour: selectedSlot,
    };

    console.log("Saving appointment:", {
      isUpdate: Boolean(selectedAppointment?.RDV_ID),
      appointmentData,
      selectedAppointment
    }); // Debug log
  
    try {
      let response;
      if (selectedAppointment?.RDV_ID) {
        // Update existing appointment
        response = await fetch(
          `http://localhost:5000/appointments/${selectedAppointment.RDV_ID}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentData),
          }
        );
      } else {
        // Check if slot is already taken
        const existingAppointment = appointments.find(
          app => app.Day === appointmentData.day && app.Hour === appointmentData.hour
        );

        if (existingAppointment) {
          alert("Ce créneau est déjà réservé. Veuillez choisir un autre horaire.");
          return;
        }

        // Create new appointment
        response = await fetch("http://localhost:5000/appointments", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(appointmentData),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
  
      await refetchAppointments();
      setIsFormVisible(false);
      setFormData({ n_dossier: "" });
      setSelectedAppointment(null);
    } catch (error) {
      console.error("Error saving/updating appointment:", error);
      alert(error.message || "Une erreur s'est produite lors de l'enregistrement du rendez-vous.");
    }
  };
  
  const handleDelete = async () => {
    // Check if we have a selected appointment
    if (!selectedAppointment) {
      alert("Aucun rendez-vous n'est sélectionné.");
      return;
    }

    // Double check we have the RDV_ID
    if (!selectedAppointment.RDV_ID) {
      console.error("Missing RDV_ID for appointment:", selectedAppointment);
      alert("Impossible de supprimer ce rendez-vous: ID manquant.");
      return;
    }

    // Confirm deletion
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      return;
    }
  
    try {
      console.log("Deleting appointment:", selectedAppointment.RDV_ID); // Debug log
      
      const response = await fetch(
        `http://localhost:5000/appointments/${selectedAppointment.RDV_ID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error: ${response.status}`);
      }
  
      await refetchAppointments();
      setIsFormVisible(false);
      setSelectedAppointment(null);
      setFormData({ n_dossier: "" });
      alert("Rendez-vous supprimé avec succès.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Une erreur s'est produite lors de la suppression du rendez-vous: " + error.message);
    }
  };

  const refetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/appointments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Fetched appointments:", data); // Debug log
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Une erreur s'est produite lors du chargement des rendez-vous.");
    }
  };

  const formatTime = (hour, minute) => {
    const formattedHour = hour < 10 ? `0${hour}` : hour;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute}`;
  };

  const generateTimeSlots = () => {
    const slots = [];
    let currentHour = startTime;
    let currentMinute = 0;

    while (currentHour + currentMinute / 60 < endTime) {
      const startTimeFormatted = formatTime(currentHour, currentMinute);

      const totalMinutes = currentMinute + interval;
      currentHour += Math.floor(totalMinutes / 60);
      currentMinute = totalMinutes % 60;

      const endTimeFormatted = formatTime(currentHour, currentMinute);
      slots.push(`${startTimeFormatted} - ${endTimeFormatted}`);
    }

    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="timetable-container">
      {isFormVisible && (
        <div className="popup-form">
          <div className="popup-form-content">
            <button
              className="popup-form-close"
              onClick={() => {
                setIsFormVisible(false);
                setSelectedAppointment(null);
                setFormData({ n_dossier: "" });
              }}
            >
              ×
            </button>
            <h2>
              {selectedAppointment ? "Modifier la Réservation" : "Réserver le Temps"}
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <label>
                  N° Dossier:
                  <input
                    type="text"
                    value={formData.n_dossier}
                    onChange={(e) =>
                      setFormData({ ...formData, n_dossier: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="form-actions">
                <button type="button" onClick={handleSave}>
                  {selectedAppointment ? "Modifier" : "Enregistrer"}
                </button>
                {selectedAppointment && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="delete-btn"
                  >
                    Supprimer
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setIsFormVisible(false);
                    setSelectedAppointment(null);
                    setFormData({ n_dossier: "" });
                  }}
                  className="cancel-btn"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="week-navigation">
        <button onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}>
          Previous Week
        </button>
        <span>{format(currentWeek, "MMMM yyyy", { locale: fr })}</span>
        <button onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
          Next Week
        </button>
      </div>

      {/* <div className="controls">
        <label>
          Heure de début:
          <input
            type="number"
            value={startTime}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 24 && value < endTime)
                setStartTime(value);
            }}
            min="1"
            max="11"
          />
        </label>
        <label>
          Heure de fin:
          <input
            type="number"
            value={endTime}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1 && value <= 24 && value > startTime)
                setEndTime(value);
            }}
            min="12"
            max="22"
          />
        </label>
        <label>
          Intervalle:
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
          >
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="25">25 minutes</option>
            <option value="30">30 minutes</option>
            <option value="40">40 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 heure</option>
          </select>
        </label>
      </div> */}

      <table>
        <thead>
          <tr>
            <th>Heure</th>
            {weekDays.map((day) => {
              const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
              return (
                <th
                  key={day}
                  className={isToday ? "today-header" : ""}
                >
                  {format(day, "EEE dd/MM", { locale: fr })}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {weekDays.map((day) => {
                const isToday = format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");

                const dayAppointment = appointments.find(
                  (app) =>
                    app.Day === format(day, "yyyy-MM-dd") && app.Hour === time
                );

                return (
                  <td
                    key={day}
                    onClick={() => handleSlotClick(day, time)}
                    className={`${isToday ? "today-column" : ""} ${dayAppointment ? "highlighted-cell" : "empty-slot"}`}
                  >
                    {dayAppointment ? `${dayAppointment.PatientFullName}` : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Timetable;
