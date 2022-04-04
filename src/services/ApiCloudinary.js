import axios from 'axios';
import {CLOUDINARY_URL, 
        CLOUDINARY_FOLDER, 
        CLOUDINARY_CLOUD_NAME, 
        CLOUDINARY_API_KEY, 
        CLOUDINARY_API_SECRET} from '../config'


export const cldUpload = (imageSelected)=> {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", CLOUDINARY_FOLDER);
    return axios.post(`https://api.Cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
    .then(response =>response.data)
}
