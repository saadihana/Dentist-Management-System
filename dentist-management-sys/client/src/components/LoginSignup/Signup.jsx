import React, { useState } from "react" 
import '../../styles/Signup.css' 
import logo2 from '../../assets/logo2.png'; 
import { useNavigate } from "react-router-dom"; 
import axios from 'axios' 
 
const Signup = () => { 
  const navigate = useNavigate(); 
  const [values, setValues] = useState({ 
    nom: '', 
    prenom: '', 
    telephone: '', 
    username: '', 
    password: '', 
 
  }) 
  const handleAdduser = async (e) => {  
    e.preventDefault();
    await axios.post('http://localhost:5000/api/add-user', values ) 
   .then(res =>  { 
    navigate('/Login'); 
   }) 
   .catch(err => console.log(err)); 
  } 
  const handleInputChange = (e)=>{ 
    const { name, value } = e.target; 
    setValues(prev => ({ 
      ...prev, 
      [name]: value 
    })); 
  } 
 return (   
    <div className="container"> 
        
        <form className="form" onSubmit={handleAdduser}> 
          
        <header className="header">Keep Smiling With Us</header> 
          <h2 className="form-title">Inscription</h2> 
          <div className="aaa"> 
          <div className="input-group"> 
            <label htmlFor="nom">Nom</label> 
            <input type="text" id="nom" name="nom" onChange={handleInputChange} value={values.nom}/> 
          </div> 
          <div className="input-group"> 
            <label htmlFor="prenom">Prenom</label> 
            <input type="text" id="prenom" name="prenom" onChange={handleInputChange} value={values.prenom}/> 
          </div> 
          <div className="input-group"> 
            <label htmlFor="telephone">Telephone</label> 
            <input type="tel" id="telephone" name="telephone"onChange={handleInputChange} value={values.telephone}/> 
          </div> 
          <div className="input-group"> 
            <label htmlFor="username">Username</label> 
            <input type="text" id="username" name="username" onChange={handleInputChange} value={values.username}/> 
          </div> 
          <div className="input-group"> 
            <label htmlFor="password">Password</label> 
            <input type="password" id="password" name="password" onChange={handleInputChange} value={values.password}/> 
          </div> 
          <div className="input-group"> 
            <label htmlFor="confirm">Confirm</label> 
            <input type="password" id="confirm" /> 
          </div> 
          <div className="input-groupA"> 
            <label htmlFor="admin" > 
              <input type="checkbox" id="admin" /> 
              Admin 
            </label> 
           
          <div className="form-buttons"> 
            <button type="submit" className="register-btn"> 
              Enregistrer 
            </button> 
              
          </div> 
        </div> 
        <div className="footer"> 
          <button type="button" className="connexion-btn" onClick={() => navigate('/Login')}>Connexion</button> 
        </div> 
        </div> 
        </form> 
        <div className="logo-container"> 
        <img src={logo2} alt="" className="logo" /> 
        </div> 
    </div> 
  ); 
} 
export default Signup