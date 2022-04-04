import React, { Fragment, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Modal }  from 'react-bootstrap'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import { Rating } from 'react-simple-star-rating'
import { ArrayAvgNote } from '../services/Functions'
import Auth from '../contexts/Auth'

const SuiteManager = ( { suite } ) => {
    
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'jpcloudy'
        }
      });

    const  navigate = useNavigate()
    const {isAuthenticated, setShowLogin} =  useContext(Auth);

    const highlightPicture = cld.image(`${suite.highlightPicture.public_id}`); 
    highlightPicture.resize(fill().width(250));


  return (
    <Fragment>
        <hr />
        <div className="d-sm-flex justify-content-between mx-4 my-2">
            <h3 className="fw-bold text-uppercase">{ suite.title }</h3>
            <div>
                <Rating  readonly allowHalfIcon ratingValue= {ArrayAvgNote(suite.comments)} size="20" fillColor="#0D6EFD" /><br /> 
                <strong className="tarif">Tarif : { suite.price } €</strong>
            </div>                                            
        </div> 
    
        <div className= "d-md-flex m-3">

        <AdvancedImage className= "highlight-125" cldImg={highlightPicture} alt={suite.highlightPicture.shortDescription} />
        <p className="m-4 px-2 justify flex-grow-1 ">{suite.description.slice(0,120)} ...</p>
        </div>
 
    </Fragment>
  )
}

export default SuiteManager