import React , {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { Fragment } from 'react'
import { getAllHotels } from '../services/ApiHotels'
import Title from '../components/Title'
import Email from '../components/Email'


const Contact = () => {

    const [loading, setLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    const [apiMessage, setApiMessage] = useState('');

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

  return (
    
    <Fragment>
        <Title>Contact</Title>
        <section className="d-md-flex p-0 m-0">   
          
            <aside className="bg-light my-4 p-4 "> 
                
            <h3>Groupe hotelier HYPNOS</h3>
                <p>Hotels de charme et de luxe</p>
                <p>N° siret  : 00 00 000 000</p>
                <p><strong>Siège social</strong>
                <br />Bd du gnerale Leclerc
                <br />75006 PARIS</p>
                <p><strong>Vous propose des séjours dans toutes la France :</strong></p>
                {!loading && 
                <ul className="nav-group my-4">
                    {hotels.map( hotel => {
                        return (
                            <li key = {hotel.id} className="nav-item my-2">
                               <Link style = {{ "textDecoration" : "none", "color" : "black"}} to={`/hotel/${hotel.id}`}>{ hotel.name} à  {hotel.city}  </Link>
                            </li>
                        )
                    })}
                </ul>
                } 

                <a className="btn btn-lg btn-primary" href="tel:+33676962058">TEL :  02 76 86 20 58</a>
            </aside>

            <section className="bg-light m-4 p-4 ">
            <Email />
            </section>
     
     </section>

    </Fragment>

  )
}

export default Contact