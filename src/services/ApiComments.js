import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllComments = async ()=> {
    return axios.get(`${API_URL}comments`, myAuthConfig())
    .then(response =>response.data)
};

export const getOneComment = async ($userId)=> {
    return axios.get(`${API_URL}comments/${$userId}`, myAuthConfig())
    .then(response =>response.data)
};

export const setOneComment = async ($userId, $myComment) => {
    return axios.patch(`${API_URL}comments/${$userId}`, $myComment, myPatchConfig())
    .then(response =>response.data)
};

export const setNewComment = async ($myComment) => {
    return axios.post(`${API_URL}comments`, $myComment, myPostConfig())
    .then(response =>response.data)
};


export const deleteOneComment = async ($id) => { 
    return axios.delete(`${API_URL}comments/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};
