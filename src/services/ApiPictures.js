import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllPictures = async ()=> {
    return axios.get(`${API_URL}pictures`, myAuthConfig())
    .then(response =>response.data)
};


export const getOnePicture = async ($pictureId)=> {
    return axios.get(`${API_URL}pictures/${$pictureId}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};

export const setOnePicture = async ($userId, $myPicture) => {
    return axios.put(`${API_URL}pictures/${$userId}`, $myPicture, myPostConfig())
    .then(response =>response.data)

};

export const setNewPicture = async ($myPicture) => {
    return axios.post(`${API_URL}pictures`, $myPicture, myPostConfig())
    .then(response =>response.data)
};


export const deleteOnePicture = async ($id) => { 
    return axios.delete(`${API_URL}pictures/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => err.message)
};



