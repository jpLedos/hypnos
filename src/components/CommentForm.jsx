import React,{useState} from 'react'
import { Rating } from 'react-simple-star-rating'
import { setNewComment } from '../services/ApiComments'
import { toast } from 'react-toastify';


const CommentForm = ({ suite, getMyHotel  }) => {
    
    const [note, setNote] = useState(0) // initial rating value
    const [comment , setComment] = useState('') 

    const handleNote = (note) => {
        setNote(note)  
      }

    const handleComment = (e) => {
        setComment(e.target.value)
    } 

    const handleSubmit = (e)=> {
        e.preventDefault()
        const myComment = {'comment' : comment , 'note' : note/20, 'suite' : '/api/suites/'+suite.id}
        newComment(myComment)
    }

    const newComment = async ($newComment) => {

        try {
            const response = await toast.promise(
                setNewComment( $newComment ),
                {
                  pending: 'Commentaire envoyé',
                  success: 'Merci pour votre commentaire 👌',
                  error: 'Vous devez être connecté pour laisser un commentaire 🤯',
                },
                {
                    position: "bottom-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                }
            );
          
            setComment('');
            setNote(0);
            getMyHotel();


        }catch ({response}){
            console.log(response.data)
           if(response.status===401){ }

        }
    };

 
  return (
    <>           
    <h2>commentaires</h2>
        <form action="">
            <Rating name='note' onClick={(e)=>handleNote(e)} transition ratingValue={note} size="20" fillColor="#0D6EFD" />
            <textarea name='comment'onChange={(e) => handleComment(e)} value={comment}  type="text" />
            <button onClick={(e)=>handleSubmit(e)} className="btn btn-sm btn-primary " >envoyer</button>
        </form>
    </>
  )
}

export default CommentForm