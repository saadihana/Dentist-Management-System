# Dentist Management System (DMS)

## Table of Contents
1. [Project Description](#project-description)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Usage](#usage)
6. [License](#license)
7. [Contributors](#contributors)

---

## Project Description
The Dentist Management System (DMS) is a comprehensive software solution designed to streamline the administrative,
operational, and clinical workflows of dental clinics. It enhances efficiency by digitizing patient records,
simplifying appointment scheduling, and providing insightful reports for clinic management.
This project is tailored for small to medium-sized dental practices to ensure better patient care,
reduced administrative burden, and adherence to healthcare regulations.

### Key Goals
- Manage patient records securely and efficiently.
- Schedule, reschedule, and cancel appointments seamlessly.
- Generate actionable insights through reports and analytics.
- Ensure compliance with data security and privacy regulations.

---

## Features
### Functional Features
- **Patient Records Management**: Add, update, and delete patient details, including medical history and treatments.
- **Appointment Scheduling**: Schedule, modify, and cancel appointments with notifications.
- **Audit Trail and Logging**: Maintain logs of all system activities for security and accountability.

### Non-Functional Features
- **Data Security**: Role-based access control and encryption for sensitive data.
- **Usability**: User-friendly interfaces for staff with minimal training requirements.
- **Reliability**: Robust error-handling and regular data backups.

---

## Technologies Used
- **Frontend**: React, CSS Modules
- **Backend**: Node.js
- **Database**: MySQL
- **Other Tools**: UML for diagrams, REST API for communication

---

## Installation and Setup
### Prerequisites
- Node.js and npm installed.
- A database management system: MySQL.

### Steps to Set Up the Project Locally
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Moussx0/dentist_management_system.git
   cd dentist-management-system
   ```

2. **Install Dependencies**:
   - Frontend:
     ```bash
     cd client
     npm install axios
     ```
   - Backend:
     ```bash
     cd server
     npm install express cors dotenv
     ```

3. **Configure the Database**:
   - Create a database and update connection details in the backend `.env` file.

4. **Run the Application**:
   - Start the backend server:
     ```bash
     cd server
     node index.js
     ```
   - Start the frontend server:
     ```bash
     cd client
     npm start
     ```

---
### Configure the Database
1. Create a MySQL database named `dentist_management`.
2. Update the backend `.env` file with the following variables:
   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=dentist

---
## Usage
1. Access the application via the browser at `http://localhost:3000`.
2. **User Roles**:
   - Dentists: Manage patient records, prescriptions, and reports.
   - Assistants: Schedule and manage appointments.

### Key Functionalities
- **Dashboard**: Overview of daily appointments and tasks.
- **Patient Management**: Add, edit, or view patient records.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributors
- **LATRECHE Dhikra Maram**
- **SAADI Hana**
- **DELENDA Insaf**
- **BOUSSEKINE Moussa**
- **BOUAZZOUNI Mohamed Amine**
- **GUECHI Ahmed Lakhdar Abderahmene**
