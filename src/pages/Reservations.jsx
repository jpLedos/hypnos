import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {Link, useNavigate } from 'react-router-dom'
import dateFormat from "dateformat"
import { getCurrentUser } from '../services/Api'
import { deleteOneReservation } from '../services/ApiReservation'
import {cancelable, totalPrice} from '../services/Functions'
import { toast } from 'react-toastify';
import Auth from '../contexts/Auth'
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import Title from '../components/Title'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const Reservations = () => {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'jpcloudy'
        }
      });
    
    const [loading, setLoading] = useState(true);
    const [apiMessage, setApiMessage] = useState('');
    const [currentUser, setCurrentUser] = useState([])
    const {isAuthenticated, setShowLogin, showLogin} =   useContext(Auth);
    const sortDesc = (a, b) => b.id - a.id;
    
    const highlightPicture = {
        display :'block',
        height : '100px',
        width : '100px',
        marginRight : '10px' ,
        margin : 'auto'  ,
        objectFit : 'cover',
        borderRadius : '10px',
        }

    useEffect(() => {
        if(isAuthenticated) {
            getUser() ;
        }else{
            setShowLogin(true);
        }
    }, [showLogin]);


    const getUser =  async () => {
        setLoading(true)
        try{
            setCurrentUser ( await getCurrentUser());
            //setCurrentUser ( myCurrentUser);
            //console.log(currentUser)
            setLoading(false)
        }catch(err){
            console.log(err.data)
            setApiMessage('Erreur de chargement')
        }
    }
 
    const deleteReservation = async ($id) => {
        setLoading(true)
        const delResa = await toast.promise(
            deleteOneReservation($id),
            {
              pending: 'Suppression en cours...',
              success: 'Votre reservation a bien été annulée !',
            },
            {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: true,
            }
        );
        getUser()
        setLoading(false)
    };

     const clickDelete = (e) => 
    {
        if( window.confirm("Etes vous sur de vouloir effectuer la suppression ")) {
            deleteReservation(e.target.name)
        }
    } 

  return (
    <Fragment>
        <Title>Mes reservations</Title>
        <section className="p-0 m-0" >   
                {(!loading & isAuthenticated ) && 
                    currentUser.reservations.sort(sortDesc).map( reservation  => {
                        const highlightPicture = cld.image(`${reservation.suite.highlightPicture.public_id}`); 
                        highlightPicture.resize(fill().width(250));
                        return (
                            <Container className="m-auto my-4 w-75 bg-light borderRadius-2 p-3  " key={reservation.id} >
                                <Row className="">
                                    <Col className="p-2">  
                                    <AdvancedImage className= "highlight-125" cldImg={highlightPicture} alt={reservation.suite.highlightPicture.shortDescription} />
                                    </Col>
                                    <Col md="6" className="m-4" >
                                        <p className="fw-bold"> Du {dateFormat(reservation.startDate,'dd/mm/yy')} Au {dateFormat(reservation.endDate,'dd/mm/yy')}</p>
                                        <p className="resa-hotel"> {reservation.suite.hotel.name} à {reservation.suite.hotel.city}</p>
                                        <p className="resa-suite">  Dans la suite {reservation.suite.title}</p>
                                    </Col>
                                    <Col className="">  
                                    <p className="pt-3 text-md-end text-center fw-bold fs-5">Tarif : {totalPrice(reservation)} €</p>         
                                    <div onClick={(e)=>clickDelete(e)} className={`btn nav-link float-left bg-danger w-50 ${!cancelable(reservation.startDate) && 'disabled'}`}>
                                        <img className="" src={bin} alt="bin" name={reservation.id} />
                                    </div> 
                                    </Col>                                   
                                </Row> 
                            </Container>
                        )
                    })
                }
                
                {(!loading & !currentUser) && 
                   <span>Vous devez vous identifier pour acceder à vos reservations</span>
                }

                
                {loading &&
                    <>
                        <span>{apiMessage}</span>
                        <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>
                }
        </section>
    </Fragment>
  )
}

export default Reservations