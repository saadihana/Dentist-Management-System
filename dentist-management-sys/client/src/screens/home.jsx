import SideBar from "../components/home/sideBar"
import SearchSection from "../components/home/searchSection"
import '../styles/home.css'
import Card from '../components/home/card'
import DayCount from "../components/home/dayCount"

import patients from '../assets/patients-card.png';
import medicament from '../assets/medicaments-card.png';
import rdv from '../assets/rdv-card.png';
import consultation from '../assets/consultation-card.png';
import finance from '../assets/finance-card.png';
import PatientList from "../test";
import BarChart from "../components/home/barchart";
import PatientTable from "../components/PatientRecords";
// import RendezVous from "../screens/RendezVous";


function Home(){
    return(
        <div id="home">
            <SideBar/>
            <div id="home-body">
                <SearchSection/>
                <div className="cards">
                    <Card color='#6633CC'  title='Patients' image={patients} count={196}/>
                    <Card color='#C180FF' title='Medicaments' image={medicament} count={57}/>
                    <Card color='#0099FF' title='Rendez-vous' image={rdv} count={201}/>
                    <Card color='#0099FF' title='Consultations' image={consultation} count={78}/>
                    <Card color='#FF7F00' title='Finance' image={finance} count={10000.00}/>
                </div>
                <div /* style={{display:"flex"}} */ className="chart-container">
                     <DayCount/>
                    <BarChart/> 
                </div>
                <PatientList/>
            </div>
        </div>
        // <div>
            
        //     <PatientList/>
        //     <BarChart/>
        // </div>
    )
}

export default Home
