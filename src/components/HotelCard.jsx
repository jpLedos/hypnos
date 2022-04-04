import React from 'react'
import {Link, Navigate} from 'react-router-dom'
import {Card,  ListGroup, ListGroupItem}  from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { ArrayAvgNote } from '../services/Functions'


const HotelCard = ( {hotel} ) => {

  return (

    <Card key={hotel.id}>
        <Card.Header style={{ width: '100%'}}>
            <Card.Title className="text-capitalize">{hotel.name}</Card.Title> 
            {/*<Rating  readonly allowHalfIcon ratingValue= { ArrayAvgNote(hotel.suites.comments) } size="20" fillColor="#0D6EFD" />*/}
        </Card.Header>
        <ListGroup style={{ width: '100%'}} className="list-group-flush">
            <ListGroupItem style={{ width: '100%'}}>
                { hotel.address }
                <br />
                <span className="text-capitalize fs-5 fw-bold">{ hotel.city }</span>
            </ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Text>
            {hotel.description.slice(0,180)} 
            {hotel.description.length>180 && '...'}
           </Card.Text>
        </Card.Body>
        <Link to={`/hotel/${hotel.id}`} >Decouvrir nos suites...</Link>
    </Card>
  )           
}

export default HotelCard