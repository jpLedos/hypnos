import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import {Button, Container, Modal } from 'react-bootstrap';
import dayjs from 'dayjs'
import {addDaysToDate, booked} from '../services/Functions'
import { getCurrentUser } from '../services/Api'
import Title from '../components/Title'
import FilterDates from '../components/FilterDates'
import Suite from '../components/Suite'

import Auth from '../contexts/Auth'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'


import { getOneHotel } from '../services/ApiHotels'

const Hotel = () => {
    
    const $dayMax = addDaysToDate(Date(),90);
    

    const { hotelId } = useParams()
    const [myHotel, setMyHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [startDateFilter, setStartDateFilter] = useState(dayjs());
    const [endDateFilter, setEndDateFilter] = useState(addDaysToDate(dayjs(),1));
    const [showLogin, setShowLogin] = useState(false);
    const {isAuthenticated, roles} =  useContext(Auth);
    const [currentUser,setCurrentUser] = useState('')



    const isBooked = ($startDateFilter, $endDateFilter, $reservations ) => {
        return booked($startDateFilter, $endDateFilter, $reservations)
    }

    useEffect(() => {
        getMyHotel();
        }, [hotelId]);

    const getMyHotel = async () => {
        setLoading(true)
        try{
        const apiHotel = await getOneHotel(hotelId);
        setMyHotel(apiHotel)
        if(isAuthenticated) {
            const myCurrentUser =   await getCurrentUser();
            setCurrentUser ( myCurrentUser);
        }
        }catch(err){
            console.log(err.data)
        }
  
        setLoading(false)
    };



  return (
    <>
        <Title> {myHotel.name} - {myHotel.city}</Title>            
        <Link className="btn btn-light mt-3 me-4 " to="/">Retour à la liste</Link>
        <FilterDates startDateFilter = {startDateFilter}
                    setStartDateFilter = {setStartDateFilter}
                    endDateFilter = {endDateFilter}
                    setEndDateFilter = {setEndDateFilter} />
        {!loading  ? 
        <Fragment>
            <Container fluid  className="d-flex p-0 m-0 text-center">   
                <div className="container-fluid bg-light m-4">
                    <div className="d-md-flex justify-content-center align-items-start">  
                        <div className="align-self-start justify mx-4 py-3"> {myHotel.description}</div>      
                    </div>
                    <hr />
                </div>
            </Container>

            <Container   >  
            {
                myHotel.suites.map(suite=>{
                    return(
                        <div key={ suite.id } className="container-fluid  bg-light mb-4 mx-1 suite"> 
                            <Suite suite= { suite } 
                                    getMyHotel = { getMyHotel } 
                                    startDateFilter = { startDateFilter } 
                                    endDateFilter = { endDateFilter } 
                                    isBooked = {isBooked}
                                    currentUser = { currentUser }/>
                            <hr />
                        </div>
                    )
                })
            }
            </Container>
        </Fragment>
        :
        loading 
        }

    </>
  )
}

export default Hotel