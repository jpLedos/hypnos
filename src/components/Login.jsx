import React, {useState} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ReCAPTCHA from "react-google-recaptcha";


const Login = () => {

    const [newCustomer, setNewCustomer ] = useState(false)
    const [captchaVerified, setCaptchaVerified] = useState(false)
        
    const toogleNewCustomer = () => {
        setNewCustomer(!newCustomer);
        
    }

    function onCaptchaChange(value) {
        //console.log("Captcha value:", value);
        setCaptchaVerified (true);
      }
       

  return (
    <>
        {newCustomer ? 
        <>
            <RegisterForm  toogleNewCustomer = {toogleNewCustomer} captchaVerified = { captchaVerified } />
            <p className="link-primary" onClick= {()=>toogleNewCustomer()}>Vous avez deja un compte ? Allez vous connecter ...</p>
        </>
        : 
        <>
            <LoginForm toogleNewCustomer = {toogleNewCustomer} captchaVerified = { captchaVerified }  />
            <p className="link-primary" onClick= {()=>toogleNewCustomer()}>Nouveau Client ? Vous souhaitez creer un compte...</p>
        </>
        }
        <ReCAPTCHA
            sitekey="6LcVEzYfAAAAAH0Z3sJmRAzw724OtvYzVFevQSDC"
            onChange={onCaptchaChange}
        />     
    </>
  )
}

export default Login