import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { deleteOneComment } from '../services/ApiComments'
import bin from '../images/icons/bin.png'


const Comments = ( {suite, currentUser, getMyHotel} ) => {

    const sortDesc = (a, b) => b.id - a.id;

    const deleteComment= async ($id) => {
        const delComment= await deleteOneComment($id);  
        getMyHotel()
    };



     const clickDelete = (e) => 
    {
        if( window.confirm('Etes vous sur de vouloir effectuer la suppression ?')) {
            deleteComment(e.target.name)
        }
    }  
  
    return (
 
    <div className="mx-lg-5  border-success">
        {suite.comments.sort(sortDesc).map(comment=> {
            return (
            <div key={comment.id} >
                <Rating name='note' readonly transition ratingValue= {(comment.note*20)} size="12" fillColor="#0D6EFD" />
                <br /><span className="comments-text">{comment.comment}</span>
                <span className="user-infos user  float-end ">
                    {
                    '/api/users/'+currentUser.id === comment.user &&
                        <div onClick={(e)=>clickDelete(e)} className="btn nav-link d-inline"  >
                            <img className="icon" src={bin} alt="bin" name={comment.id} />
                            <span className="visually-hidden">(current)</span>
                        </div>}
                </span>
                <hr />
            </div>
            )
        })}
    </div>
  )                 
}

export default Comments