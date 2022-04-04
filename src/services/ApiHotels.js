import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllHotels = async ()=> {
    return axios.get(`${API_URL}hotels`, myAuthConfig())
    .then(response =>response.data)
};


export const getOneHotel = async ($hotelId)=> {
    return axios.get(`${API_URL}hotels/${$hotelId}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};

export const setOneHotel = async ($userId, $myHotel) => {
    return axios.put(`${API_URL}hotels/${$userId}`, $myHotel, myPostConfig())
    .then(response =>response.data)

};

export const setNewHotel = async ($myHotel) => {
    return axios.post(`${API_URL}hotels`, $myHotel, myPostConfig())
    .then(response =>response.data)
};


export const deleteOneHotel = async ($id) => { 
    return axios.delete(`${API_URL}hotels/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => err.message)
};



