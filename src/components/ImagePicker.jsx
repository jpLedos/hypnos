import React, { Fragment, useState,  useEffect } from 'react'
import { Container,Spinner} from 'react-bootstrap';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {fill, thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {byAngle} from "@cloudinary/url-gen/actions/rotate"
import { getAllPictures, deleteOnePicture, setNewPicture  } from '../services/ApiPictures'

import {source} from "@cloudinary/url-gen/actions/overlay";
import {text} from "@cloudinary/url-gen/qualifiers/source";


const ImagePicker = ({ mySuite, setMySuite, setEdit }) => {

    const [images,setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'jpcloudy'
        }
      });

    useEffect(() => {
        getImages();
        }, []);
    
    const getImages =  async () => {
        setLoading(true)
        try{
            const myImages = await getAllPictures();     
            //const myCurrentUser =   await getCurrentUser();
            setImages( myImages );
            //setCurrentUser ( myCurrentUser);
            setLoading(false)
        }catch(err){
            console.log(err)
            setApiMessage('Erreur de chargement')
        }
    }


    const toogleSelected = (e) => {
        setMySuite({...mySuite, "highlightPicture" : e.target.name })
        setEdit ( true )
}

  return (
    <Fragment>
        <h5>Choisir l'image qui sera mise en avant</h5>
        {apiMessage && <div>{apiMessage}</div>}
        {!loading ? 
        <div className="d-flex flex-wrap justify-content-center">
                {images.map(image => {
                    const myImage = cld.image(`${image.public_id}`); 
                    myImage.resize(fill().width(120).height(120))
                    .roundCorners(byRadius(10))  // Round the corners.
                    const selected = ('/api/pictures/'+image.id===mySuite.highlightPicture )
                    
                    if(selected) { 
                        myImage.rotate(byAngle(5))
                        .roundCorners(byRadius(30))
                 
                        console.log('/api/pictures/'+image.id===mySuite.highlightPicture )
                    }
                   
                    return (
                        <div key={image.id} onClick={(e)=>toogleSelected(e)} className={`m-2 btn nav-link selectedImage `}>
                            <AdvancedImage name={`/api/pictures/${image.id}`}  className = "selectedImage" cldImg={myImage} alt={image.shortDescription} /><br />
                            <span className={`${selected && 'fw-bold'} text-center mt-2 text-dark`}>{image.shortDescription}</span><br />    
                            <span className="text-center text-dark">utilisée {image.suites.length} fois</span>
                        </div>                   
                    )
                })}
            </div>
            
            :
            
            <div className="text-center">
                    <Spinner className=" m-5" animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
            </Spinner>
            </div>
          
            }
         


    </Fragment>
  )
}

export default ImagePicker