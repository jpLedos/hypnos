import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Container }  from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { ArrayAvgNote, booked } from '../services/Functions'
import Auth from '../contexts/Auth'
import { setNewReservation} from '../services/ApiReservation'
//import { getAllComments } from '../services/ApiComments'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'
import ReservationConfirmation from '../components/ReservationConfirmation'
import {getItem, addItem , removeItem} from '../services/LocalStorage'
import { toast } from 'react-toastify';
import dayjs from 'dayjs'


const Suite = ( { suite, currentUser, getMyHotel, startDateFilter , endDateFilter }) => {
    

    const  navigate = useNavigate()
    const [bookable, setBookable ] = useState(false);
    const {isAuthenticated, setShowLogin} =  useContext(Auth);
    const [showModalResa, setShowModalResa] =  useState(false);
    const [reservation,setReservation] = useState({})
    const [startDate , setStartDate ] = useState()
    const CloseModalResa = () => setShowModalResa(false);
    const OpenModalResa = () => setShowModalResa(true);

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'jpcloudy'
        }
      });

    const highlightPictureStyle = {
        display :'block',
        height : '250px',
        width : '100%',
        marginRight : '10px' ,
        margin : 'auto'  ,
        objectFit : 'cover',
        borderRadius : '10px',
        }

    useEffect(() => {
        setBookable(!booked(startDateFilter, endDateFilter, suite.reservations))
        if(( !(getItem('resa')=== null)&isAuthenticated)){
            setShowModalResa(true);
            setReservation(JSON.parse(getItem('resa')))
        }
    }, [startDateFilter, endDateFilter,isAuthenticated]);


    const preReserve = () => {
        const resa = 
        {
        startDate : dayjs(startDateFilter).format("YYYY-MM-DD"),
        endDate : dayjs(endDateFilter).format("YYYY-MM-DD"),
        suite : "/api/suites/"+suite.id
        }
        setReservation(resa)
        addItem("resa",JSON.stringify(resa))
        if(!isAuthenticated) {
            setShowLogin(true);
        } else {
            setShowModalResa(true)
        }
    }

    const reserve = () => {
        newReservation(reservation);
        removeItem('resa'); 
        // user connecté ajouté par le dataPersister de API
        setShowModalResa(false)
        navigate("/reservations");  
    }

    const cancel = () => {
        removeItem('resa'); 
        setShowModalResa(false)
    }
        
    const newReservation = async ($newReservation) => {
        try {
            const response = await toast.promise(
                setNewReservation( $newReservation ),
                {
                  pending: 'Reservation en cours ',
                  success: 'Reservation confirmée 👌',
                  error: 'Echec dans le traitement de la reservation ',
                },
                {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                }
            );
        }
        catch ({response}){
            console.log(response.data)
        }
    };
 


    const highlightPicture = cld.image(`${suite.highlightPicture.public_id}`); 
    highlightPicture.resize(fill().width(500));
              

  return (
    <Fragment>
        <div className="d-flex">
            <h2 className="fw-bold text-uppercase">{ suite.title }</h2>   
            <div className="align-self-start mx-4 my-2">
                <Rating  readonly allowHalfIcon ratingValue= { ArrayAvgNote(suite.comments) }  size="20" fillColor="#0D6EFD" /> 
                <br />
                <strong className="tarif">Tarif : { suite.price } €</strong>                                             
            </div> 
        </div>
    
        <div className= "d-lg-flex m-3">
        <AdvancedImage style = {highlightPictureStyle} cldImg={highlightPicture} alt={suite.highlightPicture.shortDescription} />
        <p className="m-4 px-2 justify">{suite.description}</p>
        </div>
        <div className="d-flex px-4">
            <a href={ suite.bookingLink }>Reserver sur booking</a>
            <Button variant={!bookable ? "danger" : "primary"} onClick={preReserve} disabled={!bookable}>Reserver</Button>
        </div>


        <Container> 
           <CommentForm suite= { suite} getMyHotel = { getMyHotel } />
            <Comments suite= { suite } currentUser = { currentUser } getMyHotel = { getMyHotel } />  
        </Container>



        <Modal  show = { showModalResa }  
                onHide={CloseModalResa} 
                aria-labelledby="contained-modal-title-vcenter"
                centered>
        

            <Modal.Body>
       
                <ReservationConfirmation suite = {suite}  reservation = { reservation }/>
            </Modal.Body>
            <Modal.Footer className="">
                <Button className="float-end" variant="success" onClick={reserve}>Confirmer</Button>
                <Button className="float-end" variant="danger" onClick={cancel}>Annuler</Button>
            </Modal.Footer>
         
        </Modal>  
    </Fragment>
  )
}

export default Suite