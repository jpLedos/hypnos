import React,  { useEffect, useState, useContext, Fragment  }from 'react'
import {Link, useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../services/Api'
import { deleteOneSuite } from '../services/ApiSuite'
import { getAllHotels} from '../services/ApiHotels'
import Auth from '../contexts/Auth'
import { Spinner } from 'react-bootstrap';
import Title from '../components/Title'
import SuiteManager from '../components/SuiteManager'
import edition from '../images/icons/edition.png'
import bin from '../images/icons/bin.png'

const SuitesList = () => {

    const [loading, setLoading] = useState(true);
    const [myHotels, setMyHotels] = useState([]);
    const [apiMessage, setApiMessage] = useState('');
    const [currentUser,setCurrentUser] = useState('')
    const {isAuthenticated, roles} =  useContext(Auth);


    useEffect(() => {
        getCurrentUserHotels(); 
    }, []);



    const getCurrentUserHotels =  async () => {
        setLoading(true)
        try{ 
            if(isAuthenticated){
            setCurrentUser ( await getCurrentUser()); 
            } 
        } catch(err) {
            setApiMessage('Erreur de chargement')
            console.log(err.data)
        }
        try{
            const hotels = await getAllHotels();  
            setMyHotels( hotels )
        }catch(err){
            console.log(err.data)
            setApiMessage('Erreur de chargement')
        }

        setLoading(false)
    }
 

    const deleteSuite = async ($id) => {
        setLoading(true)
        const delSuite= await deleteOneSuite($id);
        getCurrentUserHotels()
        setLoading(false)
    };


     const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deleteSuite(e.target.name)
        }
    }   

  return (
    <Fragment>
        <Title>Management de mes suites</Title>
        <>   
            <Link className="nav-link" to="/">Retourner à la version cartes<span className="visually-hidden">(current)</span></Link>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/suite-edit">Ajouter une nouvelle suite</Link>
            </div>
            <section className="p-0 m-0">   
                    {!loading  ? 
                        myHotels.filter(hotel => hotel.manager === '/api/users/'+currentUser.id)
                        .map( hotel => {
                            return (
                                <div className="bg-light m-5 px-2 pb-3" key={hotel.id}>
                                    <h2 className="text-uppercase fs-1" >{hotel.name} ~ {hotel.city}</h2> 
                                        {hotel.suites.map( suite => {
                                            return(
                                            <div key={suite.id}>
                                                <SuiteManager suite = {suite} />   
                                                <div className="d-flex justify-content-center w-25"> 
                                                    <Link className="nav-link bg-success" to = {`/suite-edit/${suite.id}`}  >
                                                        <img className="icon" src={edition} alt="edition" />
                                                        <span className="visually-hidden">(current)</span>
                                                    </Link>
                                                    <div onClick={(e)=>clickDelete(e)} className="btn nav-link bg-danger"  >
                                                        <img className="icon" src={bin} alt="bin" name={suite.id} />
                                                        <span className="visually-hidden">(current)</span>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })}
                                </div>
                            
                            )
                        })
                 
                  

                    

                   
                    :
                    
                    <>
                        <span>{apiMessage}</span>
                        <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </>
                    }
            </section>
            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/suite-edit">Ajouter une nouvelle suite</Link>
            </div>
        </> 
    </Fragment>
  )
}

export default SuitesList