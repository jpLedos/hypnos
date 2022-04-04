import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { getAllHotels } from '../services/ApiHotels'
import Auth from '../contexts/Auth'
import { Spinner } from 'react-bootstrap';
import Title from '../components/Title'
import HotelCard from '../components/HotelCard'


const Hotels = () => {
    
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState('');
    const [apiMessage, setApiMessage] = useState('');
    const {isAuthenticated, roles} =  useContext(Auth);

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
            getHotels();
    }, [isAuthenticated]);


    const getHotels =  async () => {
        setLoading(true)
        try{
            const myHotels = await getAllHotels();     
            //const myCurrentUser =   await getCurrentUser();
            setHotels( myHotels  );
            //setCurrentUser ( myCurrentUser);
            setLoading(false)
        }catch(err){
            console.log(err.data.status)
            setApiMessage('Erreur de communication avec le serveur !')
            
        }
        setLoading(false)
    }
 

  return (
    <Fragment>
        <Title>NOS HOTELS</Title>
        <section className="d-md-flex p-0 m-0" >   
            <div className="bg-light my-4 p-4 text-center"> 
                <input  className = "mb-3 px-5 w-50" 
                        onChange={(e)=>handleChangeSearch(e)} 
                        value={search} 
                        placeholder="Recherchez par la ville" id="search" type="text" />
                
                {!loading  ? 
                <div className="card-container" >   
                    {hotels.filter(hotel => hotel.city.includes(search))
                        .map((FilteredHotel) => {
                            return (
                                <HotelCard key= {FilteredHotel.id} hotel={FilteredHotel}></HotelCard>
                            )
                        })
                    }
                    </div>
                :
                <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                </Spinner>
                }

            </div>
        </section>
    </Fragment>
  )
}

export default Hotels