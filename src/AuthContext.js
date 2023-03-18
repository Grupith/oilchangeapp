import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

// Create the AuthContext
const AuthContext = createContext();

// Export a function so we can access the AuthContext within the app
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
            console.log('the auth state was changed')
        })
        return unsubscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout
    }
    return (
        <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    )
}

