import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { Container,  Spinner, Form , Modal, Button } from 'react-bootstrap';
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import Title from '../components/Title'
import ImagePicker from '../components/ImagePicker'

import Auth from '../contexts/Auth'

import {getOneSuite, setOneSuite, setNewSuite } from '../services/ApiSuite'
import { getAllHotels } from '../services/ApiHotels'
import { getAllPictures } from '../services/ApiPictures'
import { getCurrentUser } from '../services/Api'


const SuiteEdit = () => {

    const blanckSuite = 
    {
        title:"", 
        description:"" , 
        "hotel" : "DEFAULT",
        "highlightPicture" :"DEFAULT"
    }
    const navigate = useNavigate(); 
    const {suiteId}  = useParams()
    const [mySuite, setMySuite] = useState(blanckSuite);
    const [mySuiteB, setMySuiteB] = useState(blanckSuite);
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const {isAuthenticated} =  useContext(Auth);
    const [updateError,setUpdateError] = useState("");
    const [hotels , setHotels] = useState([]);
    const [currentUser,setCurrentUser] = useState('')
    const [pictures, setPictures] = useState([]);
    const [showImagePicker, setShowImagePicker]=useState(false);
    const [creation] = useState(()=>{
        if (typeof suiteId==='undefined') {
            return true;
        }else {
            return false;
        }
    })
    const [apiMessage, setApiMessage] = useState("");
    const [apiClass, setApiClass] = useState("");
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'jpcloudy'
        }
      });
    const highlightPicture = cld.image(`t`); 
    highlightPicture.resize(fill().width(250));


    useEffect(() => {
        getHotels();
        getPictures();
        }, []);

    useEffect(() => {
        if(!creation) {
            getMySuite();
        }
    }, []);
        
    const getMySuite = async () => {
        setLoading(true)
        getHotels()
        const apiSuite = await getOneSuite(suiteId);
        setMySuite(apiSuite)
        setMySuiteB(apiSuite);
        setEdit(false);
        setLoading(false)
        //console.log(apiSuite)
    };

    const getHotels =  async () => {
        if(isAuthenticated){
            setCurrentUser ( await getCurrentUser()); 
            } 
        try{
            const myHotels = await getAllHotels();     
            setHotels( ...hotels, myHotels  );
        }catch(err){
            console.log(err.data)
            setApiMessage('Erreur de chargement')
        }  
    }

    const getPictures =  async () => {
        try{
            const myPictures = await getAllPictures();     
            setPictures( ...pictures, myPictures  );
        }catch(err){
            console.log(err.data)
            setApiMessage('Erreur de chargement')
        }  
        //console.log(pictures);
    }


    const setApiSuite = async () => {
        try{
            setLoading(true);
            const response = await setOneSuite(suiteId, mySuite )
            const apiSuite = await getOneSuite(suiteId);
            setMySuite(apiSuite)
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


    const newSuite = async () => {
        console.log(JSON.stringify(mySuite))
        try {
            setLoading(true);
            const newApiSuite = await setNewSuite(mySuite )
            setEdit(false)
            setApiClass('text-success')
            setApiMessage('Suite ajoutée')
            setLoading(false);
        }catch ({response}){
            console.log(response.data)
            if(response.status===401){
                navigate('/');
            }
            setEdit(false)
            setApiClass('text-danger')
            setApiMessage('Erreur de creation')
            setLoading(false);
        }
    };

    const CloseImagePicker = () => {
        setShowImagePicker(false);
    }

    const openImagePicker =(e) => {
        e.preventDefault();
        setShowImagePicker(true)

    }

    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        setMySuite({...mySuite, [name] : parseInt(value) ? parseInt(value)  : value })
        setEdit(true);
        setApiMessage('')
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        setMySuite(mySuiteB);
        setEdit(false);
        setUpdateError('');
    }

    const handleSave = (e) =>{
        e.preventDefault();
        if (!creation) {
            setApiSuite();
        }else {
            newSuite();
        }
    }

    const apiResponse = {apiMessage} && <p className={apiClass}>{apiMessage}</p>

  return (
    <Fragment>
        {!creation ? <Title>Modification de la suite</Title>  : <Title>Creation d'une nouvelle Suite</Title> } 
        <Container className="mt-4">   
            {apiResponse}
            {!loading  ? 
                <Form onSubmit={()=>false} className="bg-light mt-4 p-4">
                <Form.Group className="mb-3" >
                <Form.Label htmlFor="hotel">Hotel : </Form.Label>
                    <Form.Select    value={ mySuite.hotel }  
                                    onChange={handleChange} 
                                    name="hotel" id="hotel"
                                    aria-label="select hotel">
                        <option value="DEFAULT" disabled>Selectionner l'hotel ...</option>
                        {hotels.filter(hotel => hotel.manager === '/api/users/'+currentUser.id)
                        .map(hotel => {
                                return(
                                    <option 
                                    value={`/api/hotels/${hotel.id}`} 
                                    key={hotel.id}>{hotel.name} { hotel.city}</option>
                                )
                            })}
                    </Form.Select>  
                </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label htmlFor="title">Nom de la suite :</Form.Label>
                    <Form.Control as="input" id="title" onChange={handleChange} autoComplete="title" name="title" placeholder="Nom de la suite" type="text" value={mySuite.title} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" >
                    <Form.Label htmlFor="price">Tarif de la suite en euros par nuitée :</Form.Label>
                    <Form.Control as="input" id="bookingLink" onChange={handleChange} autoComplete="price" name="price" placeholder="Tarif" type="text" value={mySuite.price} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label htmlFor="description">Description : </Form.Label>
                        <Form.Control as="textarea" id="description" onChange={handleChange} rows="5"  autoComplete="description" name="description" placeholder="Description" type="text" value={mySuite.description} />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" >
                    <Form.Label htmlFor="bookingLink">Lien Booking : <a target="_blank" href={mySuite.bookingLink}>Tester le lien</a> vers une nouvelle page</Form.Label>
                    <Form.Control as="input" id="bookingLink" onChange={handleChange} rows="5"  autoComplete="bookingLink" name="bookingLink" placeholder="Lien Booking" type="text" value={mySuite.bookingLink} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                    <Form.Label htmlFor="highlightPicture">Choix rapide de l'image mise en valeur : </Form.Label><br />
                    <Form.Select    value={ mySuite.highlightPicture }  
                                    className ="d-inline w-75" 
                                    onChange={handleChange}                                   
                                    name="highlightPicture" id="highlightPicture"
                                    aria-label="select highlightPicture">
                            <option value="DEFAULT" disabled>Selectionner l'image mise en valeur ...</option>
                            {pictures.map(picture => {
                                    return(
                                        <option 
                                            value={`/api/pictures/${picture.id}`} 
                                            key={picture.id}>
                                           { picture.shortDescription }
                                        </option>
                                    )
                                })}
                    </Form.Select> 
                            <button 
                                onClick = {(e)=>openImagePicker(e)}  
                                className="btn btn-success btn-sm p-2  m-2 ">
                                ... ou Choisir l'image dans la médiathèque</button>
                    </Form.Group>

                    <div className="">
                        {
                        edit &&    
                        <div className="form-button">
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
        </Container>

        <div className="d-flex justify-content-center">
            <Link className="btn btn-light m-3 " to="/suites-list">Retour à la liste</Link>
        </div>

        <Modal  show = { showImagePicker }  
                onHide={CloseImagePicker } 
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
                fullscreen='sm-down'>
            <Modal.Body>
                <ImagePicker mySuite = { mySuite } setMySuite = { setMySuite } setEdit = { setEdit }/>
            </Modal.Body>
            <Modal.Footer className="">
                <Button className="float-end" variant="danger" onClick={CloseImagePicker}>Fermer</Button>
            </Modal.Footer>
        </Modal>

    </Fragment>
  )
}

export default SuiteEdit