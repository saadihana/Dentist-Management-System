import '../../styles/sideBar.css'
import logo from '../../assets/dreamsmile.png';
import home from '../../assets/home.png';
import add from '../../assets/add.png';
import consultation from '../../assets/consultation.png';
import document from '../../assets/documents.png';
import rdv from '../../assets/rdv.png';
import stats from '../../assets/stats.png';
import settings from '../../assets/settings.png';
import deconnect from '../../assets/se-deconnecter.png';
import RendezVous from "../../screens/RendezVous";
import Ordonnance from "../ordonnance";
// import PatientTable from '../screens/PatientTable';


import { Navigate, useNavigate } from "react-router-dom";


import photo from '../../assets/photo.png'

function SideBarItem(props) {
  const navigate = useNavigate();

  return (
    <li className="sideBar-item" onClick={() => {
      if (props.title === 'Déconnecter') {
        localStorage.removeItem('user');
        navigate('/');
      } else {
        navigate(props.navigateTo); // Navigate to the passed route
      }
    }}>
      <img src={props.image} alt="" />
      <p>{props.title}</p>
    </li>
  );
}



function SideBar(){

    return(
        <div className="sideBar">
            <img src={logo} alt="" className='side-bar-logo' />
            <hr className='separator'/>
            <ul className='list'>

                <SideBarItem title={"Accueil"} image={home}/>
                <SideBarItem title={"Patients"} image={add} navigateTo="/patients"/>
                <SideBarItem title={"Consulations"} image={consultation}/>
                <SideBarItem title={"Documents"} image={document}/>
                <SideBarItem title={"Ordnnance"} image={document} navigateTo="/Ordonnance" />
                <SideBarItem title={"Rendez-vous"} image={rdv} navigateTo="/RendezVous"/>
                <SideBarItem title={"Parametres"} image={settings}/>
                <SideBarItem title={"Statistiques"} image={stats}/>

                <img src={photo} alt="" id='photo'/>

                <SideBarItem title={"Déconnecter"} image={deconnect}/>

            </ul>
        </div>
    )
}

export default SideBar