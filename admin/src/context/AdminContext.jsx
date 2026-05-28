import axios from 'axios';
import { useState } from 'react';
import { createContext } from 'react'
import { toast } from 'react-toastify';
export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') || null);
    const[doctors,setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAllDoctors = async () => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/all-doctors`, {},{
                headers: {
                    Authorization: `Bearer ${aToken}`,
                    atoken: aToken
                }
            });
            if (data?.success && data.doctors) {
                setDoctors(data.doctors)
                // console.log(data.doctors);
            } else {
                toast.error(data.message || 'Failed to fetch doctors')
            }


        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch doctors')
        }
    };

    const changeAvailability = async (docId) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/admin/change-availability`, {docId}, {       
                headers: {
                    Authorization: `Bearer ${aToken}`,
                    atoken: aToken
                }
            });
            if (data?.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message || 'Failed to change availability')
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to change availability')
        }  
    }

    const value = {
        aToken,
        setAToken,
        backendUrl,
        doctors,
        getAllDoctors,
        changeAvailability
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider