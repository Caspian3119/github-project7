import React, { useContext, useState } from 'react'

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ( {children} ) => {
    const [activeAccount, setActiveAccount] = useState(); //if token active
    const [isloading, setIsLoading] = useState(false); // token validating
    const [token, setToken] = useState(localStorage.getItem("token"));
    const value = {
        activeAccount,
        token,
        setActiveAccount,
        setToken
    }; 
    return (
        <AuthContext.Provider value={value}>{!isloading && children}</AuthContext.Provider>
        )
}