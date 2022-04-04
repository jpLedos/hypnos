import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllUsers = async ()=> {
    return axios.get(`${API_URL}users`, myAuthConfig())
    .then(response =>response.data)
};

export const getOneUser = async ($userId)=> {
    return axios.get(`${API_URL}users/${$userId}`, myAuthConfig())
    .then(response =>response.data)
};

export const setOneUser = async ($userId, $myUser) => {
    return axios.put(`${API_URL}users/${$userId}`, $myUser, myPostConfig())
    .then(response =>response.data)
};

export const setNewUser = async ($myUser) => {
    return axios.post(`${API_URL}users`, $myUser, myPostConfig())
    .then(response =>response.data)
};


export const deleteOneUser = async ($id) => { 
    return axios.delete(`${API_URL}users/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};
