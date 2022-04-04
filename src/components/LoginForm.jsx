import React, {useContext, useEffect, useState, Fragment} from 'react'
import { login, logout, hasAuthenticated } from '../services/AuthApi'
import Auth from '../contexts/Auth'
import { Spinner, Button, Container } from 'react-bootstrap';

const LoginForm = ( {toogleNewCustomer,  captchaVerified } ) => {

    const [ email , setEmail ]= useState('');
    const [password , setPassword] = useState('');
    const {isAuthenticated,setIsAuthenticated, roles, setRoles, setShowLogin } = useContext(Auth);
    const [showSpinner , setShowSpinner] = useState(false);
    const[btnConnexionDisabled, setBtnConnexionDisabled] = useState(true)

    useEffect(() => {
        const emailValid = email.match(/[a-z0-9_\-.]+@[a-z0-9_\-.]+\.[a-z]+/i);
        if(password.length >=4 && emailValid && captchaVerified ) {
            setBtnConnexionDisabled(false)
        }else {
            setBtnConnexionDisabled(true)
        }
      },[email, password,captchaVerified])

    const handleEmail = (e) => {    
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {    
        setPassword(e.target.value);
    }


    const HandleSubmit = async (e) => {
        e.preventDefault(); 
            const apiSuccess = document.getElementById("apiSuccess")
            const apiError = document.getElementById("apiError")
            const credentials = {
                email, 
                password,
            }
            setShowSpinner(true)
            try {
                const response = await login(credentials);
                setIsAuthenticated(hasAuthenticated().tokenValid);
                setRoles (hasAuthenticated().roles);
                setEmail ( hasAuthenticated().email);
                document.forms['contact'].reset();
                apiSuccess.innerHTML="Vous etes connecté !";
                apiError.innerHTML="";
                setShowSpinner(false);
                setShowLogin(false);
            } catch ({response}) {
                setIsAuthenticated(false);
                logout()
                apiSuccess.innerHTML=""
                apiError.innerHTML=  response.data.message
                setShowSpinner(false)
            } 
    }
 
  return (
    <Fragment>
        <section className="bg-light p-2 my-4" style={{witdh : '80%'}} >
            <h3>Formulaire de Connexion</h3>
            <div className="msg">
                
                <p className="msgSuccess" id="apiSuccess"></p>
                <p className="msgError" id="apiError"></p>
            </div>
            <form name="contact">
                <div>
                    <input type="email" id="email-log" name="email" 
                    value={email}
                    onChange={(e)=>handleEmail(e)}
                    required aria-required="true" 
                    autoComplete = "email"
                    className="form-control" placeholder="Votre Email"/>  
                </div>
                <div>
                    <input type="password" id="password" name ="password" 
                    value={password}
                    onChange={(e)=>handlePassword(e)}
                    required aria-required="true" className="form-control" 
                    autoComplete = "current-password"
                    placeholder="Votre mot de passe"
                    />
                </div>

                <div className="d-flex">
                {showSpinner ?
                    <Spinner className="text-center m-2" animation="border" variant="primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                    </Spinner>
                :
                <Button onClick= {HandleSubmit}  disabled= { btnConnexionDisabled } >Connectez vous</Button>
                }
                </div>
            </form>
        </section>
    </Fragment>
  )
}

export default LoginForm