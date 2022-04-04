import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllSuites = async ()=> {
    return axios.get(`${API_URL}users`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};


export const getOneSuite = async ($suiteId)=> {
    return axios.get(`${API_URL}suites/${$suiteId}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};

export const setOneSuite = async ($userId, $mySuite) => {
    return axios.put(`${API_URL}suites/${$userId}`, $mySuite, myPostConfig())
    .then(response =>response.data)

};

export const setNewSuite = async ($mySuite) => {
    return axios.post(`${API_URL}suites`, $mySuite, myPostConfig())
    .then(response =>response.data)
};


export const deleteOneSuite = async ($id) => { 
    return axios.delete(`${API_URL}suites/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => err.message)
};



