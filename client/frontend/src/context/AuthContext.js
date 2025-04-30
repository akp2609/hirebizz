import { createContext, React, useContext, useState,useEffect } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    }

    const logout = ()=>{
        setIsAuthenticated(false);
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{isAuthenticated,user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


export const useAuth = ()=> useContext(AuthContext);