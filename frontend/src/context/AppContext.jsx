import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

export const AppContextProvider = (props)=>{
    const currencySymbol = '₹';
    const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

    const [doctors, setDoctors] = useState([]);
    const[token,setToken] = useState(localStorage.getItem('token') || null);
    const[userData,setUserData] = useState(false);


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

    const loadUserProfileData = async (token) => {
        try {
            const { data } = await axios.get(`${backendURL}/api/user/get-profile`, {    
                headers: {
                    Authorization: `Bearer ${token}`,
                    token: token
                }
            });
            if (data?.success && data.user) {
                setUserData(data.user);
            } else {
                toast.error(data?.message || 'Failed to load user data');
            }
        } catch (error) {
            console.error(error?.response?.data?.message || 'Failed to load user data');
            toast.error(error?.response?.data?.message || 'Failed to load user data');
        }
    };

    const value = {
        doctors,
        currencySymbol,
        getDoctorsData,
        token,
        setToken,
        backendURL,
        userData,
        setUserData,
        loadUserProfileData
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData(token);
        } else {
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
