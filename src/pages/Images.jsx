import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { Container,Spinner} from 'react-bootstrap';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {fill, thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import { getAllPictures, deleteOnePicture, setNewPicture  } from '../services/ApiPictures'
import { cldUpload } from '../services/ApiCloudinary'
import Title from '../components/Title'
import bin from '../images/icons/bin.png'


const Images = () => {

    const [images,setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [imageSelected, setImageSelected] = useState("");

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
                //console.log(myImages);
                //setCurrentUser ( myCurrentUser);
                setLoading(false)
            }catch(err){
                console.log(err)
                setApiMessage('Erreur de chargement')
            }
        }
     
        const deletePicture = async ($id) => {
            setLoading(true)
            const delPicture = await deleteOnePicture($id);
            getImages()
            setLoading(false)
        };
    
         const clickDelete = (e) => 
            {console.log(e.target)
            if( window.confirm("Etes vous sur de vouloir effectuer la suppression ")) {
                deletePicture(e.target.name)
            }
        } 


        const handleChangeSelectedImage =(target)=>{
            setImageSelected(target)
        }
    
        const uploadClick = async () => {
            try{
                setLoading(true)
                const newImage = await cldUpload(imageSelected);
                console.log(newImage)
                const picture = {
                    "publicId" : newImage.public_id,
                    "shortDescription" : newImage.original_filename,
                    "secureUrl" : newImage.secure_url
                }
                //console.log("picture : " ,JSON.stringify(picture))
                setImageSelected("")
                setLoading(false)
                try {
                    setLoading(true)
                    const newPicture = await setNewPicture(picture)
                    getImages()
                    setLoading(false)
                } catch (error) {
                    console.log(error.data)
                }
            } catch(err) {
                console.log(err)
            }
        };


  return (
    <Fragment>
        <Title>Les images</Title>
        {apiMessage}
        <Container>
            <div className="d-sm-flex justify-center my-3">
                <input  className="w-50" onChange={(e)=> handleChangeSelectedImage(e.target.files[0])} 
                type="file" 
                accept=".jpg, .jpeg, .png" />
                {loading &&
                    <Spinner className="text-center m-5" animation="border" variant="primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                {imageSelected && <button className="btn btn-success " onClick={uploadClick}>Upload</button> }
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                {images.map(image => {
                    const myImage = cld.image(`${image.public_id}`); 
                    myImage.resize(fill().width(150).height(150))
                    .roundCorners(byRadius(10));    // Round the corners.

                    return (
                        <div key={image.id} className="m-2">
                            <div onClick={(e)=>clickDelete(e)} className="btn nav-link"  >
                               
                            </div>
                            <AdvancedImage cldImg={myImage} alt={image.shortDescription} /><br />
                            <span className="text-center mx-2">{image.shortDescription}</span><br />
                            {
                                image.suites.length ===0 &&
                                <span className="btn"><img className="icon" src={bin} alt="bin" onClick={(e)=>clickDelete(e)} name={image.id} /></span>
                            }
                            <span>(utilisé : {image.suites.length})</span>
                        </div>                
                            
                    )
                })}
            </div>
        </Container>
    </Fragment>
  )
}

export default Images