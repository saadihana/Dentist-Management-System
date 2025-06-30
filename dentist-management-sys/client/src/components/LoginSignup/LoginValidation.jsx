function validation(values){
 
let error ={}
const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/
 
if(values.username === "")
{
    error.username = "Nom d'Utilisateur non valide!"
} else{ error.username= ""}

if(values.password === "")
    {
        error.password = "password non valide!"
    }

 else if (!password_pattern.test(values.password))
 {
    error.password = "Password ne match pas (6 characters)"
 }
 else {
    error.password= ""
 }
 return error;
}
export default validation;