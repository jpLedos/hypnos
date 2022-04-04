import { getItem } from '../services/LocalStorage'
import axios from 'axios';
import {  hasAuthenticated } from '../services/AuthApi'
import {API_URL} from '../config'

export const myAuthConfig = () => {
    let myConfig = {
        headers: {          
        accept : "application/json",
        }
    }
    if(hasAuthenticated().tokenValid ){
        myConfig.headers = {...myConfig.headers,Authorization: "Bearer " + getItem('nut-token'), }
    }
    return myConfig;
}

export const myPostConfig = () => {
    let myConfig = {
        headers: {
       accept : "application/json", 
       'Content-Type' : 'application/ld+json'
        }
    }
    myConfig.headers = {...myConfig.headers,Authorization: "Bearer " + getItem('nut-token'), }

    return myConfig
 }

 export const myPatchConfig = () => {
    let myConfig = {
        headers: {
       accept : "application/json", 
       'Content-Type' : 'application/merge-patch+json'
        }
    }
    myConfig.headers = {...myConfig.headers,Authorization: "Bearer " + getItem('nut-token'), }

    return myConfig
 }


export const getCurrentUser = async ()=> {
    return axios.get(`${API_URL}users`, myAuthConfig())
    .then(response =>response.data)
    .then(data => data[0]) 
    .catch(err => {console.log(err.response.data);})
};








