import { useState } from 'react';
import { createContext } from 'react'
export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const value = {
        token,
        setToken,
        backendUrl
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider