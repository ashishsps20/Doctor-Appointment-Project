import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const currencySymbol = '₹';
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';
    const [doctors, setDoctors] = useState([]);


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(`${backendURL}/api/doctor/list`);  
            if (data?.success && data.doctors) {
                setDoctors(data.doctors);
            } else {
                toast.error(data?.message || 'Failed to fetch doctors');
            }   
        } catch (error) {
            console.error(error?.response?.data?.message || 'Failed to fetch doctors');
            toast.error(error?.response?.data?.message || 'Failed to fetch doctors');
        }
    };

    const value = {
        doctors,
        currencySymbol,
        getDoctorsData
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
