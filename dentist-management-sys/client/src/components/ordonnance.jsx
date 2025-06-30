import React, { useState } from "react";

const Ordonnance = () => {
  const [form, setForm] = useState({
    clinicName: "Cabinet Médical",
    doctorName: "Dr. Example Nom",
    address: "Rue des Exemples, 12345 Ville",
    phone: "0123456789",
    date: new Date().toLocaleDateString(),
    patientName: "",
    patientAge: "",
    medications: ["", "", "", "", ""],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeMedication = (index, value) => {
    const updatedMedications = [...form.medications];
    updatedMedications[index] = value;
    setForm((prev) => ({ ...prev, medications: updatedMedications }));
  };

  return (
    <>
      <div
        style={{
          width: "210mm",
          height: "297mm", // A4 size
          margin: "0 auto",
          padding: "20mm",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "white",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "20px",
            borderBottom: "2px solid black",
            paddingBottom: "10px",
          }}
        >
          <input
            type="text"
            name="clinicName"
            value={form.clinicName}
            onChange={handleInputChange}
            style={{
              fontSize: "20px",
              textAlign: "center",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
            }}
          />
          <input
            type="text"
            name="doctorName"
            value={form.doctorName}
            onChange={handleInputChange}
            style={{
              fontSize: "16px",
              textAlign: "center",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
              marginTop: "10px",
            }}
          />
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            style={{
              fontSize: "14px",
              textAlign: "center",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
              marginTop: "10px",
            }}
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            style={{
              fontSize: "14px",
              textAlign: "center",
              border: "none",
              borderBottom: "1px solid black",
              width: "100%",
              marginTop: "10px",
            }}
          />
        </header>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Ordonnance</h2>
          <p>
            <strong>Date:</strong>{" "}
            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              style={{
                border: "none",
                borderBottom: "1px solid black",
                width: "150px",
              }}
            />
          </p>
          <p>
            <strong>Patient:</strong>{" "}
            <input
              type="text"
              name="patientName"
              value={form.patientName}
              onChange={handleInputChange}
              style={{
                border: "none",
                borderBottom: "1px solid black",
                width: "300px",
              }}
            />
          </p>
          <p>
            <strong>Âge:</strong>{" "}
            <input
              type="text"
              name="patientAge"
              value={form.patientAge}
              onChange={handleInputChange}
              style={{
                border: "none",
                borderBottom: "1px solid black",
                width: "100px",
              }}
            />
          </p>
        </section>

        <section>
          <h3 style={{ borderBottom: "1px solid black", marginBottom: "10px" }}>
            Médicaments Prescrits:
          </h3>
          <ul style={{ lineHeight: "1.8" }}>
            {form.medications.map((medication, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={medication}
                  onChange={(e) =>
                    handleChangeMedication(index, e.target.value)
                  }
                  style={{
                    border: "none",
                    borderBottom: "1px solid black",
                    width: "90%",
                  }}
                />
              </li>
            ))}
          </ul>
        </section>

        <footer
          style={{
            marginTop: "40px",
            textAlign: "center",
            borderTop: "1px solid black",
            paddingTop: "10px",
          }}
        >
          <p>Signature: _____________________________</p>
          <p style={{ fontSize: "12px", marginTop: "10px" }}>
            *Cette ordonnance est valable uniquement dans les conditions définies
            par la loi.
          </p>
        </footer>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => window.print()}
          style={{
            backgroundColor: "#0066ba",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Imprimer
        </button>
      </div>

      <style>
        {`
          @media print {
            button {
              display: none;
            }
            body {
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
            }
            div {
              page-break-inside: avoid;
            }
          }
        `}
      </style>
    </>
  );
};

export default Ordonnance;
