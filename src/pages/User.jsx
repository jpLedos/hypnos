import React,  { useEffect, useState, useContext  }from 'react'
import { Fragment } from 'react'
import {Link, useParams } from 'react-router-dom'
import { Container,Row, Col,  Spinner ,Form} from 'react-bootstrap';
import Title from '../components/Title'
import { getOneUser, setOneUser, setNewUser} from '../services/ApiUsers'
import { getAllCategories, getAllAllergens} from '../services/Api'
import Auth from '../contexts/Auth'
import { alreadySelected } from '../services/Functions'
import plusminus from '../images/icons/more-or-less.png'


const User = () => {

    const blanckUser = 
    {
        email:"", 
        firstname:"" , 
        lastname:"" , 
        password:"",
    }

    const { userId } = useParams()
    const [myUser, setMyUser] = useState("");
    const [myUserB, setMyUserB] = useState("");
    const [updateError,setUpdateError] = useState("");
    const [loading, setLoading] = useState(false);
    const {isAuthenticated} =  useContext(Auth);
    const [edit, setEdit] = useState(false);
    const [creation] = useState(()=>{
        if (typeof userId==='undefined') {
            return true;
        }else {
            return false;
        }
    })


    useEffect(() => {
        if(!creation) {
            getMyUser();
        }else{
            setMyUser(blanckUser)
            setMyUserB(blanckUser)
        }
        }, []);
             

    const getMyUser = async () => {
        setLoading(true)
        const apiUser = await getOneUser(userId);
        setMyUser(apiUser)
        setMyUserB(apiUser);
        setEdit(false);
        setLoading(false)
    };

        
    const setApiUser = async () => {
        try{     
            if (myUser.password==="") {
            delete myUser.password
        }
        setLoading(true);
        const userUpdated = await setOneUser(userId, myUser );
        getMyUser();
        }catch(response){
            setUpdateError("une erreur est survenue !");
            console.log(response.data)
            setLoading(false);
        }
   
    };

    const newUser = async () => {
        try{
            setLoading(true);
            const newApiUser = await setNewUser(myUser )
            getMyUser();
        }
        catch(response){
            setUpdateError("une erreur est survenue !");
            console.log(response)
            setLoading(false);
    }
    
    };


    const handleChange = ({currentTarget}) => {
        const {name, value } = currentTarget;
        //console.log(currentTarget);
        setMyUser({...myUser, [name] : value})
        setEdit(true);
    }

    const cancelUpdate = (e) => {
        e.preventDefault();
        setMyUser(myUserB);
        setEdit(false);
        setUpdateError('');
    }

    const handleSave = (e) =>{
        e.preventDefault();
        if (!creation) {
            setApiUser();
        }else {
            newUser();
        }
    }

  return (
    <Fragment>
        {!creation ? <Title>Edition d'un gérant</Title>  : <Title>Creation d'un gérants</Title> } 
        <Container fluid  className="p-0 m-0 text-center">   
            <Row>
                <Col className="bg-light my-4 p-4 "> 
                    {!loading  ?
                        <Form onSubmit={()=>false}>
                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor="email" className="">Email</Form.Label>
                                <Form.Control id="email" type="email" onChange={handleChange} name="email" placeholder="Email" value={myUser.email} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor="firstname" className="">Prénom</Form.Label>
                                <Form.Control id="firstname" onChange={handleChange} autoComplete="firstname" name="firstname" placeholder="Prenom" type="text" value={myUser.firstname} />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label htmlFor="lastname" className="">Nom</Form.Label>
                                <Form.Control id="lastname" onChange={handleChange} autoComplete="lastame" name="lastname" placeholder="Nom" type="text" value={myUser.lastname} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" >
                            <Form.Label htmlFor="password" className="">Mot de passe</Form.Label>
                            <Form.Control id="password" onChange={handleChange} autoComplete="current-password" name="password" placeholder="Nouveau mot de passe" type="password" value={myUser.password} />
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
                </Col>
            </Row>
        </Container>

            <div className="d-flex justify-content-center">
                <Link className="btn btn-light m-3 " to="/users">Retour à la liste</Link>
            </div>
    </Fragment>
  )
}

export default User