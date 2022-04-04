import React from 'react'
import {Link} from 'react-router-dom'

function Footer() {
    return (
        
        <footer className="bg-primary">
            <div className="footer-container">
            
                <Link className="copyright link" to="/mentions-legales-politique-confidentialite">
                        Mentions légales & politique de confidentialité
                </Link>
           
                <div className="social-icons">
                <div className="logo-social">
                    <a href="https://public.joomeo.com/users/jpledos/albums" target="_blank" rel="noreferrer">
                    <svg className="logo-social" xmlns="http://www.w3.org/2000/svg" width="41.818" height="31.252" viewBox="0 0 41.818 31.252">
                    <path id="Icon_ionic-logo-facebook" data-name="Icon ionic-logo-facebook" d="M43.065,4.5H6.753C5.51,4.5,4.5,5.248,4.5,6.17V33.082c0,.922,1.01,1.67,2.253,1.67H24.909V22.777H20.03V18.366h4.879V15.1c0-3.908,3.657-6.035,8.366-6.035,2.253,0,4.677.126,5.24.181v4.081H34.763c-2.562,0-3.051.9-3.051,2.222v2.813h6.1l-.8,4.412h-5.3V34.752H43.065c1.244,0,2.254-.748,2.254-1.67V6.17C45.318,5.248,44.308,4.5,43.065,4.5Z" transform="translate(-4 -4)" fill="#7dbed8" stroke="#2d728d" strokeWidth="1"/>
                    </svg></a>
                </div>

                <div className="logo-social">
                    <a href="https://www.instagram.com/jpledos/" target="_blank" rel="noreferrer"><svg  id="Icon_ionic-logo-instagram" data-name="Icon ionic-logo-instagram" xmlns="http://www.w3.org/2000/svg" width="45.716" height="32.579" viewBox="0 0 45.716 32.579">
                    <path id="Tracé_231" data-name="Tracé 231" d="M36.882,7.215a11.719,11.719,0,0,1,6.727,1.994A5.953,5.953,0,0,1,46.407,14V27.577a6,6,0,0,1-2.8,4.793,11.629,11.629,0,0,1-6.727,1.994H17.834a11.719,11.719,0,0,1-6.726-1.994,5.953,5.953,0,0,1-2.8-4.793V14a6,6,0,0,1,2.8-4.793,11.629,11.629,0,0,1,6.726-1.994H36.882m0-2.715H17.834C10.5,4.5,4.5,8.776,4.5,14V27.577c0,5.226,6,9.5,13.334,9.5H36.882c7.334,0,13.334-4.276,13.334-9.5V14c0-5.226-6-9.5-13.334-9.5Z" transform="translate(-4.5 -4.5)" fill="#7dbed8"/>
                    <path id="Tracé_232" data-name="Tracé 232" d="M26.482,15.109a2.954,2.954,0,0,1-2.857-3.055,2.864,2.864,0,1,1,5.715,0A2.962,2.962,0,0,1,26.482,15.109Z" transform="translate(8.757 -3.958)" fill="#7dbed8"/>
                    <path id="Tracé_233" data-name="Tracé 233" d="M22.679,15.067A7.635,7.635,0,1,1,15.06,22.7a7.634,7.634,0,0,1,7.619-7.634m0-3.817A11.452,11.452,0,1,0,34.108,22.7,11.443,11.443,0,0,0,22.679,11.25Z" transform="translate(1.132 -6.208)" fill="#7dbed8"/>
                    </svg></a>
                </div>
            </div>
                <p className= "copyright">Created by  JP LEDOS . Copyright © 2022 . </p>
            </div>
        </footer>
    )
}

export default Footer
