import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../services/Api'
import { getAllHotels, deleteOneHotel} from '../services/ApiHotels'
import Auth from '../contexts/Auth'
import { Spinner } from 'react-bootstrap';
import Title from '../components/Title'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const HotelsList = () => {

    
    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState('');
    const [apiMessage, setApiMessage] = useState('');
    const [currentUser,setCurrentUser] = useState('')
    const {isAuthenticated, roles} =  useContext(Auth);
    

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

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
            
            console.log(err.data.status)
            setApiMessage('Erreur de chargement')
        }
    }
 
    const deleteHotel = async ($id) => {
        setLoading(true)
        const delHotel= await deleteOneHotel($id);
        getHotels()
        setLoading(false)
    };



     const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deleteHotel(e.target.name)
        }
    }   

  return (
    <Fragment>
        <Title>Liste des établissments</Title>
        <>   
            <Link className="nav-link" to="/">Retourner à la version cartes<span className="visually-hidden">(current)</span></Link>
            <section className="d-md-flex p-0 m-0" >   
                <div className="bg-light p-2 ">
                    <input className = "mb-3" onChange={(e)=>handleChangeSearch(e)} value={search} placeholder="Recherche" id="search" type="text" />
                    {!loading  ? 
                    <table className="table table-hover" style={{minWidth : '400px', maxWidth : '800px'}}>
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Ville</th>
                            <th scope="col">Manager</th>
                            <th scope="col">description</th>
                            <th></th>

                            </tr>
                        </thead>
                        
                        <tbody>
                            
                            {hotels.filter(hotel => hotel.name.includes(search))
                            .map((FilteredHotel) => {
                                return (
                                    <tr className="hotel-row " key={FilteredHotel.id}>
                                        <th scope="row">{FilteredHotel.id}</th>
                                        <th>{FilteredHotel.name}</th>
                                        <th>{FilteredHotel.city}</th>
                                        <th>{FilteredHotel.manager.lastname}</th>
                                        <td className="">{FilteredHotel.description.slice(0,80)}
                                        {FilteredHotel.description.length > 30 && ' ...'}</td>
                                        { roles.includes("ROLE_ADMIN") && 
                                        <td >
                                            <Link className="nav-link" to = {`/edit-hotel/${FilteredHotel.id}`}  >
                                                <img className="icon" src={edition} alt="edition" />
                                                <span className="visually-hidden">(current)</span>
                                            </Link>
                                            <div onClick={(e)=>clickDelete(e)} className="btn nav-link"  >
                                                <img className="icon" src={bin} alt="bin" name={FilteredHotel.id} />
                                                <span className="visually-hidden">(current)</span>
                                            </div>
                                        </td>
                                        }
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                    :
                    <>
                        <span>{apiMessage}</span>
                        <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>
                    }
                </div>
            </section>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/edit-hotel">Créer un nouvel établissment</Link>
            </div>
        </> 
    </Fragment>
  )
}

export default HotelsList