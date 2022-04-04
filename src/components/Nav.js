import React, {useState, useEffect, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {Button, Modal } from 'react-bootstrap';
import Auth from "../contexts/Auth";
import { logout } from '../services/AuthApi'
import { getAllHotels } from '../services/ApiHotels'
import logo from '../images/logo-hypnos-white.png'
import Login from './Login'

function Nav() {

    const {isAuthenticated, setIsAuthenticated, roles, setRoles , setShowLogin ,showLogin} =  useContext(Auth);
    const navigate = useNavigate();    
    const handleLogout =() => {
        logout();
        setIsAuthenticated( false);  
        setRoles([]);
        navigate("/");
    }

    const CloseLogin = () => {
        setShowLogin(false);
        navigate("/");
    }
    const openLogin = () => setShowLogin(true);

    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [apiMessage, setApiMessage] = useState('');

    useEffect(() => {
        getHotels();
    }, []);


    const getHotels =  async () => {
        setLoading(true)
        try{
            const myHotels = await getAllHotels();     
            //const myCurrentUser =   await getCurrentUser();
            setHotels( myHotels  );
            //console.log(myHotels);
            //setCurrentUser ( myCurrentUser);
            setLoading(false)
        }catch(err){
            console.log(err.data)
            setApiMessage('Erreur de chargement')
        }
    }

    const logoStyle = {
        display :'block',
        position : 'relative',
        width : '80px',
        marginRight : '10px'}

    return (
        <>
        <nav style = {{position :"fixed", width : "100%"}}  className="navbar navbar-expand-md navbar-dark bg-primary fs-5">
            <div className="container-fluid">
                
                <img style = {logoStyle} src={logo} alt="logo" />
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item active">
                        <Link className="nav-link" to="/">Accueil
                            <span className="visually-hidden">(current)</span>
                        </Link>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Les hotels</a>
                            <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                                {hotels.map( hotel => {
                                return (
                                    <div key = {hotel.id}>         
                                        <li  className=" m-2">
                                            <Link style = {{ "textDecoration" : "none", "color":"#cecece "}} to={`hotel/${hotel.id}`}>{ hotel.name}</Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                    </div> 
                                    )
                                })}
                            </ul>
                        </li>  

                        <li className="nav-item">
                        <Link className="nav-link" to="reservations">Mes reservations
                            <span className="visually-hidden">(current)</span>
                        </Link>
                        </li>

                        <li className="nav-item active">
                        <Link className="nav-link" to="Contact">Contact
                            <span className="visually-hidden">(current)</span>
                        </Link>
                        </li>

                        {roles.includes('ROLE_ADMIN') &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-warning " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Administration</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item" to="users">Gestion des Utilisateurs</Link></li>
                                    <li><Link className="dropdown-item" to="/hotels-list">Administrer les établissements</Link></li>
                                </ul>
                            </li>  
                        }
                          
                        {roles.includes('ROLE_MANAGER') &&
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-warning " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Administration</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li> <Link className="dropdown-item" to="suites-list">Gestion des Suites</Link></li>
                                    <li><Link className="dropdown-item" to="/images">Gerer la médiatheque</Link></li>
                                </ul>
                            </li> 
                        }
                    </ul>
                    
                        {!isAuthenticated ? (
                            <button onClick = {()=>openLogin(true)}  className="btn btn-success btn-sm p-2  mb-2 ">
                                Se connecter
                            <span className="visually-hidden">(current)</span>
                            
                            </button>
                            ) : 
                            (
                            <button onClick = {()=>handleLogout()}  className="btn btn-danger btn-sm p-2  mb-2 ">
                                Se deconnecter
                                    <span className="visually-hidden">(current)</span>
                            </button>
                            )
                        }

                </div>
            </div>
        </nav>
        <Modal  show = { showLogin }  
                onHide={CloseLogin} 
                aria-labelledby="contained-modal-title-vcenter"
                centered>
            <Modal.Body>
                <Login />
            </Modal.Body>
            <Modal.Footer className="">
                <Button className="float-end" variant="danger" onClick={CloseLogin}>Fermer</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default Nav
