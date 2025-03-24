import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [email, setEmail] = useState('');

    useEffect(() => {
        axios.get('http://localhost:4000/user', { withCredentials: true })
            .then(response => {
                setEmail(response.data.email || '');
            });
    }, []);

    function logout() {
        axios.post('http://localhost:4000/logout', {}, { withCredentials: true })
            .then(() => setEmail(''));
    }

    return (
        <UserContext.Provider value={{ email, setEmail, logout }}>
            {children}
        </UserContext.Provider>
    );
}
