import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { Container} from 'react-bootstrap';
import dateFormat from "dateformat"
import {addDaysToDate, booked} from '../services/Functions'

import Title from '../components/Title'
import FilterDates from '../components/FilterDates'
import Suite from '../components/Suite'
import Auth from '../contexts/Auth'


import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'


import { getOneHotel } from '../services/ApiHotels'

const Hotelcopy = () => {
    
    const $dayMax = addDaysToDate(Date(),90);
    

    const { hotelId } = useParams()
    const [myHotel, setMyHotel] = useState({});
    const [loading, setLoading] = useState(true);
    const [startDateFilter, setStartDateFilter] = useState(Date());
    const [endDateFilter, setEndDateFilter] = useState(addDaysToDate(Date(),1));

    const isBooked = ($startDateFilter, $endDateFilter, $reservations ) => {
        return booked($startDateFilter, $endDateFilter, $reservations)
    }

    useEffect(() => {
        getMyHotel();
        }, []);
    
    
        

    const getMyHotel = async () => {
        setLoading(true)
        const apiHotel = await getOneHotel(hotelId);
        setMyHotel(apiHotel)
        setLoading(false)
        //console.log(apiHotel)
    };

    const handleChangeStartDate = (e) => {
        setStartDateFilter(e.target.value);
        setEndDateFilter(addDaysToDate(e.target.value,1));
    }
    
    const handleChangeEndDate = (e) => {
        setEndDateFilter(e.target.value);
    }

  return (
    <Fragment>
        <Title> {myHotel.name} - {myHotel.city}</Title>            
        <Link className="btn btn-light mt-3 me-4 " to="/">Retour à la liste</Link>
        <FilterDates />
        
        <div className="d-md-flex date-filter-container text-center justify-content-center">
            DU <input   className = "date-filter" 
                        onChange={(e)=>handleChangeStartDate(e)} 
                        value={dateFormat(startDateFilter,"yyyy-mm-dd")} 
                        min={ dateFormat(Date(),"yyyy-mm-dd") } 
                        max= { dateFormat($dayMax,"yyyy-mm-dd") }
                        id="startDateFilter" 
                        type="date" />
            &nbsp; AU  &nbsp;
                <input 
                        className = "date-filter" 
                        onChange={(e)=>handleChangeEndDate(e)} 
                        value={dateFormat(endDateFilter,"yyyy-mm-dd")} 
                        min={ dateFormat(addDaysToDate(startDateFilter,1),"yyyy-mm-dd") } 
                        max= { dateFormat(addDaysToDate(startDateFilter,7),"yyyy-mm-dd") }
                        id="endDateFilter"
                        type="date" />     
        </div>
        {!loading  ? 
        <Fragment>
        <Container fluid  className="d-flex p-0 m-0 text-center">   
            <div className="container-fluid bg-light m-4">
                <div className="d-md-flex justify-content-center align-items-start">  
                    <div className="align-self-start mx-4"> {myHotel.description}</div>      
                </div>
                <hr />
            </div>
        </Container>

        <Container   >  
        {
            myHotel.suites.map(suite=>{
                return(
                    <div key={ suite.id } className="container-fluid  bg-light mb-4 mx-1 suite"> 
                        <Suite suite= { suite } startDateFilter = { startDateFilter } endDateFilter = { endDateFilter } isBooked = {isBooked}/>
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
        

    </Fragment>
  )
}

export default Hotelcopy