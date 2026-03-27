import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Crea il context
const AuthContext = createContext();

// Provider che avvolge tutta l'app
export function Authentication({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsAdmin(!!user);
        });
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook per usare il context ovunque
export function useAuth() {
    return useContext(AuthContext);
}