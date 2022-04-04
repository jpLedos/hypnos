import React, {useContext, useEffect, useState} from 'react'
import { Fragment } from 'react'
import { register, login, logout, hasAuthenticated } from '../services/AuthApi'
import Auth from '../contexts/Auth'
import { Spinner, Button } from 'react-bootstrap';

const LoginForm = ( {toogleNewCustomer, captchaVerified} ) => {

    const [ email , setEmail ]= useState('');
    const [ password , setPassword] = useState('');
    const [ passwordConf , setPasswordConf] = useState('');
    const [ firstname , setFirstname ]= useState('');
    const [ lastname , setLastname ]= useState('');
    
    const {isAuthenticated,setIsAuthenticated, roles, setRoles } = useContext(Auth);
    const [showSpinner , setShowSpinner] = useState(false);
    const[btnConnexionDisabled, setBtnConnexionDisabled] = useState(true)

    useEffect(() => {
        if(formValid() && captchaVerified)  {
            setBtnConnexionDisabled(false)
        }else {
            setBtnConnexionDisabled(true)
        }
      },[email, password, captchaVerified])


    const formValid = () => {
        const emailValid = email.match(/[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]+/i);
        const passwordValid = (password.length >=4);
        const passwordVerified = (password === passwordConf);
        const lastnameValid = (lastname.length > 3);
        const firstnameValid = (firstname.length > 3);
        
        return emailValid && passwordValid && passwordVerified && lastnameValid && firstnameValid 

    }

    const handleEmail = (e) => {    
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {    
        setPassword(e.target.value);
    }

    const handlePasswordConf = (e) => {    
        setPasswordConf(e.target.value);
    }

    const handleFirstname = (e) => {    
        setFirstname(e.target.value);
    }

    const handleLastname = (e) => {    
        setLastname(e.target.value);
    }

    const HandleSubmit = async (e) => {
        e.preventDefault(); 
            const apiSuccess = document.getElementById("apiSuccess")
            const apiError = document.getElementById("apiError")
            const credentials = {
                email, 
                password,
                lastname,
                firstname
            }
            setShowSpinner(true)
            try {
                const response = await register(credentials);
                const loginResponse = await login(credentials)
                setIsAuthenticated(hasAuthenticated().tokenValid);
                setRoles (hasAuthenticated().roles);
                setEmail ( hasAuthenticated().email);
                document.forms['contact'].reset();
                apiSuccess.innerHTML="Vous etes connecté !";
                apiError.innerHTML="";
                setShowSpinner(false);
            } catch ({response}) {
                console.log(response)
                setIsAuthenticated(false);
                logout()
                setShowSpinner(false)
                apiSuccess.innerHTML=""
                apiError.innerHTML=  response.data.message
            } 
    }
 
  return (
    <section className="bg-light p-2 my-4">
        <h3>Creer votre compte</h3>
        <div className="msg">
            <p className="msgSuccess" id="apiSuccess"></p>
            <p className="msgError" id="apiError"></p>
        </div>
        <form name="contact">
            <div>
                <input type="text" name="firstname" 
                value={firstname}
                onChange={(e)=>handleFirstname(e)}
                required aria-required="true" 
                autoComplete = "firstname"
                className="form-control" placeholder="Votre prénom"/>  
            </div>
            <div>
                <input type="text" id="lastname" name="lastname" 
                value={lastname}
                onChange={(e)=>handleLastname(e)}
                required aria-required="true" 
                autoComplete = "lastname"
                className="form-control" placeholder="Votre nom"/>  
            </div>
            <div>
                <input type="email" name="email" 
                value={email}
                onChange={(e)=>handleEmail(e)}
                required aria-required="true" 
                autoComplete = "email"
                className="form-control" placeholder="Votre Email"/>  
            </div>
            <div>
                <input type="password"  name ="password" 
                value={password}
                onChange={(e)=>handlePassword(e)}
                required aria-required="true" className="form-control" 
                autoComplete = "current-password"
                placeholder="Votre mot de passe"
                />
            </div>
            <div>
                <input type="password"  name ="passwordConf" 
                value={passwordConf}
                onChange={(e)=>handlePasswordConf(e)}
                required aria-required="true" className="form-control" 
                autoComplete = "current-password"
                placeholder="Confirmer le mot de passe"
                />
            </div>

            <div className="d-flex">
            {showSpinner ?
                <Spinner className="text-center m-2" animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>
            :
            <Button onClick= {HandleSubmit}  disabled= { btnConnexionDisabled } >Enregistrez vous</Button>
            }
            </div>
        </form>
    </section>
  )
}

export default LoginForm