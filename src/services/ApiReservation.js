import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllReservations = async ()=> {
    return axios.get(`${API_URL}reservations`, myAuthConfig())
    .then(response =>response.data)
};


export const getOneReservation = async ($reservationId)=> {
    return axios.get(`${API_URL}reservations/${$reservationId}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};

export const setOneReservation = async ($userId, $myReservation) => {
    return axios.patch(`${API_URL}reservations/${$userId}`, $myReservation, myPatchConfig())
    .then(response =>response.data)

};

export const setNewReservation = async ($myReservation) => {
    return axios.post(`${API_URL}reservations`, $myReservation, myPostConfig())
    .then(response =>response.data)
};


export const deleteOneReservation = async ($id) => { 
    return axios.delete(`${API_URL}reservations/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => err.message)
};



