import React, { Fragment } from 'react'
import {API_URL} from '../config'

const Email = () => {

    const subjects = [
        "Je souhaite poser une réclamation",
        "Je souhaite commander un service complémentaire",
        "Je souhaite en savoir plus sur une suite",
        "J'ai un souci avec cette application",
    ]

  
    const validateForm = () =>                                 
    { 
        let formOk= true;

        const lastname = document.getElementById("lastname");
        const firstname = document.getElementById("firstname");
        const email = document.getElementById("email");   
        const subject = document.getElementById("subject");       
        const message = document.getElementById("message");
                
        if (lastname.value === ""){ 
            document.getElementById('errorLastname').innerHTML="Veuillez entrez un nom valide";  
            lastname.focus(); 
            formOk= false; 
        }else{
            document.getElementById('errorLastname').innerHTML="";  
        }

        if (firstname.value === ""){ 
            document.getElementById('errorFirstname').innerHTML="Veuillez entrez un prénom valide";  
            lastname.focus(); 
            formOk= false; 
        }else{
            document.getElementById('errorFirstname').innerHTML="";  
        }



        if  (!email.value.match(/[a-z0-9_\-\.]+@[a-z0-9_\-\.]+\.[a-z]+/i)){ 
            document.getElementById('errorEmail').innerHTML="Veuillez entrez un email valide";  
            email.focus(); 
            formOk =  false; 
        }else{
            document.getElementById('errorEmail').innerHTML="";  
        }


        if (subject.value === "DEFAULT"){ 
            document.getElementById('errorSubject').innerHTML="Merci de preciser le sujet de votre demande";  
            lastname.focus(); 
            formOk= false; 
        }else{
            document.getElementById('errorSubject').innerHTML="";  
        }

        if (message.value === ""){ 
            document.getElementById('errorMessage').innerHTML="Veuillez entrez un message";  
            message.focus(); 
            formOk = false; 
        }else{
            document.getElementById('errorMessage').innerHTML="";  
        }

        return formOk;
    }


    const handleSubmit =(e) => {
        e.preventDefault();
        if(validateForm()) {

            const lastname = document.getElementById("lastname").value;
            const firstname = document.getElementById("firstname").value;        
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;  
            const message = document.getElementById("message").value;

            const apiSuccess = document.getElementById("apiSuccess")
            const apiError = document.getElementById("apiError")

            const payload = {
                lastname,
                firstname,
                email, 
                subject,
                message,
            }
         
            const url =`${API_URL}emails`;
            //console.log("post : " + url);
            //console.log(JSON.stringify({payload}));
            fetch(url,{
                method : "POST" ,
                headers : {
                    "content-type" : "application/json",
                },
                body : JSON.stringify(payload),
            })
            .then(response => {
                //console.log(response);
                if(response.ok){
                        document.forms['lastname'].reset();
                        apiSuccess.innerHTML="Merci pour votre message qui a bien été envoyé !"
                        apiError.innerHTML=""

                } else {
                    apiSuccess.innerHTML=""
                    apiError.innerHTML="Une erreur est survenue lors de l envoi du message !"
                };
            })
        }
    }


  return (

    <Fragment>
            <h2>Envoyer votre message</h2>
            <div className="msg">
                <p className="msgSuccess" id="apiSuccess"></p>
                <p className="msgError" id="apiError"></p>
            </div>
            <form name="lastname" action="https://formspree.io/f/mjvlgznz" encType="multipart/form-data" method='POST'>
                <div>
                    <input type="text" id="lastname" name="lastname" required aria-required="true" className="form-control" placeholder="Votre Nom"/>
                    <span className="msgError" id="errorLastname"></span>
                </div>
                <div>
                    <input type="text" id="firstname" name ="firstname" required aria-required="true" className="form-control" placeholder="Votre Prénom"/>
                    <span className="msgError" id="errorFirstname"></span>
                </div>
                <div>
                    <input type="email" id="email" name="email" required aria-required="true" className="form-control" placeholder="Votre Email"/>  
                    <span className="msgError" id="errorEmail"></span>
                </div>

                <div>
                    <select id="subject" name ="subject" defaultValue={'DEFAULT'}  required aria-required="true" className="form-control">
                    <option value="DEFAULT" disabled>Selectionner le sujet ...</option>
                        {subjects.map(subject => {
                            return(
                                <option 
                                    value= {subject}
                                    key={subject}>{subject}
                                </option>
                            )
                        })}
                    </select>             


                    <span className="msgError" id="errorSubject"></span>
                </div>

                <div>
                    <textarea name="message" id="message" required aria-required="true" className="form-control" cols="60" rows="8" placeholder="Votre message"></textarea>
                    <span className="msgError" id="errorMessage"></span>
                </div>
                <div><button onClick= {handleSubmit}  type="submit" className="btn-lastname btn-primary ">Envoyer le message</button></div>   
            </form>
    </Fragment>
  )
}

export default Email