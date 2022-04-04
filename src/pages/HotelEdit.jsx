import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import {   Spinner, Form , FormCheck } from 'react-bootstrap';
import Title from '../components/Title'
import Auth from '../contexts/Auth'
import {getOneHotel, setOneHotel, setNewHotel ,deleteOneHotel} from '../services/ApiHotels'
import {getAllUsers} from '../services/ApiUsers'

const HotelEdit = () => {

    const blanckHotel = 
    {
        name:"", 
        description:"" , 
        city:"",
        address:"",
        "manager" : "DEFAULT"
    }
    
    const navigate = useNavigate(); 

    const { hotelId } = useParams()
    const [myHotel, setMyHotel] = useState(blanckHotel);
    const [myHotelB, setMyHotelB] = useState(blanckHotel);
    const [managers, setManagers] = useState([]);

    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const {isAuthenticated} =  useContext(Auth);
    const [updateError,setUpdateError] = useState("");
    
    const [creation] = useState(()=>{
        if (typeof hotelId==='undefined') {
            return true;
        }else {
            return false;
        }
    })
    const [apiMessage, setApiMessage] = useState("");
    const [apiClass, setApiClass] = useState("");


    useEffect(() => {
        if(!isAuthenticated){
            navigate('/');
        }
        if(!creation) {
            getMyHotel();
        }
        getAllManagers();
        }, [creation]);

        
    const getMyHotel = async () => {
        setLoading(true)
        const apiHotel = await getOneHotel(hotelId);
        //console.log(apiHotel.manager)
        setMyHotel(apiHotel)
        setMyHotelB(apiHotel);
        setEdit(false);
        setLoading(false)
    };

    const getAllManagers = async  () => {
        try {
            const apiAllUsers = await getAllUsers();
            const allManagers = apiAllUsers.filter(user => user.roles.includes('ROLE_MANAGER'))
            setManagers(allManagers);
            //console.log(apiAllUsers)
            //console.log(allManagers)
        }catch({ response }){
            console.log(response.data)
        }
    }

    const setApiHotel = async () => {
        if (myHotel.password==="") {
            delete myHotel.password
        }
        try{
            setLoading(true);
            const response = await setOneHotel(hotelId, myHotel )
            const apiHotel = await getOneHotel(hotelId);
            setMyHotel(apiHotel)
            setEdit(false)
            setApiClass('text-success')
            setApiMessage('Mise à jour effectuée')
            setLoading(false);
        }catch ({ response }) {
            console.log(response.data)
            if(response.status===401){
                navigate('/');
            }
            setEdit(false)
            setApiClass('text-danger')
            setApiMessage('Erreur de mise à jour')
            setLoading(false);
        }
    };


    const newHotel = async () => {
        try {
            setLoading(true);
            const newApiHotel = await setNewHotel(myHotel )
            setEdit(false)
            setApiClass('text-success')
            setApiMessage('Etablissement ajouté')
            setLoading(false);
        }catch ({response}){
            console.log(response.status)
            if(response.status===401){
                navigate('/');
            }
            setEdit(false)
            setApiClass('text-danger')
            setApiMessage('Erreur de creation')
            setLoading(false);
        }

    };

   
    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        setMyHotel({...myHotel, [name] : value.toString()})
        setEdit(true);
        setApiMessage('')
        //console.log(JSON.stringify(myHotel))
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        setMyHotel(myHotelB);
        setEdit(false);
        setUpdateError('');
    }

    const handleSave = (e) =>{
        e.preventDefault();
        if (!creation) {
            setApiHotel();
        }else {
            newHotel();
        }
    }

    const apiResponse = {apiMessage} && <p className={apiClass}>{apiMessage}</p>

  return (
    <Fragment>
        {!creation ? <Title>Edition Hotel</Title>  : <Title>Nouvelle Recettte</Title> } 
        <section  className="d-md-flex p-0 m-0 text-center">   
            <div  className="bg-light my-4  p-5"> 
                {apiResponse}
                    {!loading  ? 
                        <Form onSubmit={()=>false}>
                            <input className="mb-4" onChange={handleChange} name="name" placeholder="Nom de l'hotel" type="text" value={myHotel.name} />
                                <Form.Group className="mb-3" >
                            <label htmlFor="pet-select">Gerant de l'hotel</label>
                            <select value={ myHotel.manager } onChange={handleChange} name="manager" id="manager">
                                <option value="DEFAULT" disabled>Selectionner le manager ...</option>
                                {managers.map(manager => {
                                    return(
                                        <option 
                                            value={`/api/users/${manager.id}`} 
                                            key={manager.id}>{manager.firstname} {manager.lastname} ({manager.email})
                                        </option>
                                    )
                                })}
                            </select>
                                <Form.Label htmlFor="address">Adresses : </Form.Label>
                                <input onChange={handleChange} id="address" name="address" placeholder="adresse" type="text" value={myHotel.address} />
                                <Form.Label htmlFor="city">Ville : </Form.Label>
                                <input onChange={handleChange} id="city" name="city" placeholder="Ville" type="text" value={myHotel.city} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor="description">description : </Form.Label>
                                <Form.Control as="textarea" id="description" onChange={handleChange} rows="15"  autoComplete="description" name="description" placeholder="Description" type="text" value={myHotel.description} />
                            </Form.Group>
                            <div className="">
                                {
                                edit &&    
                                <div className="d-flex form-button">
                                    <button onClick={(e)=>cancelUpdate(e)} className="btn btn-danger btn-sm m-4">Annuler</button>
                                    <button onClick={(e)=>handleSave(e)} className="btn btn-primary btn-sm m-4">Enregistrer</button>
                                    <span className="text-danger">{updateError}</span>
                                </div> 
                                }

                            </div>
                        </Form>
                    :
                        <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    }
            </div>
      
        </section>

            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/hotels-list">Retour à la liste</Link>
            </div>
    </Fragment>
  )
}

export default HotelEdit