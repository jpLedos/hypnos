import React, {useState} from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hasAuthenticated } from './services/AuthApi'
import Auth from "./contexts/Auth"
import ProtectedRoute from './components/ProtectedRoute'

import HotelsList from './pages/HotelsList'
import HotelsCard from './pages/HotelsCard'
import Hotel from './pages/Hotel'
import Reservations from './pages/Reservations'
import Header from './components/Header'
import Footer from './components/Footer'
import MentionsLegales from './pages/MentionsLegales'
import ErrorPage from './pages/ErrorPage'
import HotelEdit from './pages/HotelEdit'
import SuiteEdit from './pages/SuiteEdit'
import SuitesList from './pages/SuitesList'
import Images from './pages/Images'


import Users from './pages/Users'
import User from './pages/User'
import Contact from './pages/Contact'

function App() {

const [isAuthenticated,setIsAuthenticated] = useState(hasAuthenticated().tokenValid);
const [roles,setRoles] = useState(hasAuthenticated().roles);
const [email, setEmail] = useState(hasAuthenticated().email);
const [showLogin,setShowLogin] = useState()
//console.log(roles)
return (
    <Auth.Provider value = {{ isAuthenticated, setIsAuthenticated, 
                            roles, setRoles,
                            email, setEmail,
                            showLogin, setShowLogin }}>
        <Router>
        <Header/ >

        <Routes>
            <Route path="/" element = { <HotelsCard /> } />
            <Route path="/hotel/:hotelId" element = { <Hotel /> } /> 
            <Route path="/reservations" element = { <Reservations /> } /> 
            <Route path="/contact" element = { <Contact /> } />
            <Route path="/mentions-legales-politique-confidentialite" element = { <MentionsLegales /> } />
            <Route element={
                <ProtectedRoute 
                isAllowed={isAuthenticated && roles.includes('ROLE_MANAGER') } />}>
                <Route path="/suite-edit/:suiteId" element = { <SuiteEdit /> } />
                <Route path="/suite-edit" element = { <SuiteEdit /> } />
                <Route path="/suites-list" element = { <SuitesList /> } />
                <Route path="/images" element = { <Images /> } />               
            </Route>
            <Route element={
                <ProtectedRoute 
                isAllowed={isAuthenticated && roles.includes('ROLE_ADMIN') } />}>
                <Route path="/hotels-list" element = {<HotelsList />} />
                <Route path="/edit-hotel/:hotelId" element = { <HotelEdit /> } /> 
                <Route path="/edit-hotel" element = { <HotelEdit /> } />            

                <Route path="/edit-recipe" element = { <SuiteEdit /> } />            
                <Route path="/user" element = { <User /> } />
                <Route exact path="/users" element = { <Users /> } />
                <Route path="/user/:userId" element = { <User /> } />
            </Route>


            <Route path="*" element = { <ErrorPage /> } />
        </Routes>
        
        <Footer  /> 
        
        </Router>
        <ToastContainer />
    </Auth.Provider>

  );
}

export default App