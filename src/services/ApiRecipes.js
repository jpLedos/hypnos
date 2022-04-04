import axios from 'axios';
import {API_URL} from '../config'
import {myAuthConfig, myPatchConfig, myPostConfig} from './Api'


export const getAllRecipes = async ()=> {
    return axios.get(`${API_URL}users`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};


export const getOneRecipe = async ($recipeId)=> {
    return axios.get(`${API_URL}recipes/${$recipeId}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => {console.log(err.response.data)})
};

export const setOneRecipe = async ($userId, $myRecipe) => {
    return axios.patch(`${API_URL}recipes/${$userId}`, $myRecipe, myPatchConfig())
    .then(response =>response.data)

};

export const setNewRecipe = async ($myRecipe) => {
    return axios.post(`${API_URL}recipes`, $myRecipe, myPostConfig())
    .then(response =>response.data)
};


export const deleteOneRecipe = async ($id) => { 
    return axios.delete(`${API_URL}recipes/${$id}`, myAuthConfig())
    .then(response =>response.data)
    .catch(err => err.message)
};



