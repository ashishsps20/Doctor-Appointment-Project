import { createContext, useState } from 'react'
export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = '₹';
    const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark' ? true : false);

    const toggleTheme = () => {
        const newTheme = !darkMode;
        setDarkMode(newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    const calculateAge = (dob) => {
        if (!dob) return 'N/A';
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age;
    }
    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split("_");
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    }
    const value = {
        calculateAge,
        slotDateFormat,
        currency,
        darkMode,
        toggleTheme
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider