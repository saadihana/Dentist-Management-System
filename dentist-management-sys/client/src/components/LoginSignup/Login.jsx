import React, { useState } from "react"
import '../../styles/Login.css'
import logo2 from '../../assets/logo2.png';
import validation from "./LoginValidation"; 
import { Navigate, useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues]= useState({
        username: '',
        password: ''
    })
    const [errors, setErrors]= useState({})
    
    const handleInput = (e)=>{ 
      const { name, value } = e.target; 
      setValues(prev => ({ 
        ...prev, 
        [name]: value 
      })); 
    } 
    
    const handleSubmit= async (event) =>{
          event.preventDefault();
          setErrors(validation(values));
          // if(errors.username === "" && errors.password==="")
          // {
            await axios.post('http://localhost:5000/api/login', values )
            .then(res =>  {
              if(res.data !== "fail" && res.data!=='Error') {
                localStorage.setItem('user',res.data);
                navigate('/Home');
              }
              else {
                alert("No record existed");
              }
            })
            .catch(err => console.log(err));
          // }
        }
    return (  
        <div className="containerlogin">
       
        <form className="formlogin"  onSubmit={handleSubmit}>
        <header className="headerlogin">Keep Smiling With Us</header>
          <h2 className="form-titlelogin">Inscription</h2>
          <div className="input-grouplogin">
            <label htmlFor="username">Nom d'Utilisateur</label>
            <input type="text" name="username" onChange= {handleInput} id="username" />
          </div>

          <div className="input-grouplogin">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange= {handleInput} id="password" />
          </div>


          <div className="input-grouplogin">
            <label htmlFor="profession">profession</label>
            <input type="text" id="profession" />
          </div>
           
          <div className="buttons-containerlogin">
            <button type="submit" className="Connexion-btnlogin">
               Connexion
            </button>
            <button type="button" className="new-btnlogin" onClick={() => navigate('/Signup')}>Créer un compte</button>
          </div>
     </form>
        <div className="logo-containerlogin">
        <img src={logo2} alt="" className="logologin" />
        </div>
    </div>
    ); 
}
export default Login
