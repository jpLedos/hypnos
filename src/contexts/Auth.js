import React from 'react';

export default React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: value => {   
    },
    roles : [],
    setRoles: value => { 
    },
    showLogin : true,
    setShowLogin: value => {
    }
})

