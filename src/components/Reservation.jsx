import React from 'react'
import dateFormat from "dateformat"
import {  Container, Row, Col } from 'react-bootstrap';
import {cancelable, totalPrice} from '../services/Functions'

const Reservation = ({reservation}) => {

    const clickDelete = (e) => 
    {
        if( window.confirm("Etes vous sur de vouloir effectuer la suppression ")) {
            
        }
    } 


  return (
    <Container className="m-auto my-4 w-75 bg-light borderRadius-2 p-3 suite " key={reservation.id} >
    <Row className="">
     {/* <Col className="p-2">  
     <img style = {highlightPicture} src={ bin}  
            alt={ reservation.suite.highlightPicture.shortDescription } />
     </Col>  */}
        <Col md="6" className="m-4" >
            <p className="fw-bold"> Du {dateFormat(reservation.startDate,'dd/mm/yy')} Au {dateFormat(reservation.endDate,'dd/mm/yy')}</p>
            
            <p className="resa-suite">  Dans la suite {reservation.suite.title}</p>
     </Col>
     <Col className="">  
     <p className="pt-3 text-md-end text-center fw-bold fs-5">Tarif : {totalPrice(reservation)} €</p>         
        <div onClick={(e)=>clickDelete(e)} className={`btn nav-link float-left bg-danger w-50 ${!cancelable(reservation.startDate) && 'disabled'}`}>
           
        </div> 
     </Col>                                   
    </Row> 
</Container>
  )
}

export default Reservation