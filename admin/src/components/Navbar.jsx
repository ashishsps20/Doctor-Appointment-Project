import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AppContext } from '../context/AppContext'
import FullLogo from './FullLogo'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);
    const {darkMode, toggleTheme} = useContext(AppContext);

    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate('/');
        aToken && setAToken(null);
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken(null);
        dToken && localStorage.removeItem('dToken');
    }

  return (
    <div className='flex items-center justify-between bg-[var(--app-surface)] text-[var(--app-ink)] px-6 py-4 shadow-md border-b border-[var(--app-ink)]/10'>
        <div className='flex items-center gap-3 text-xl font-semibold'>
            <div className='flex flex-col'>
                <FullLogo 
                    text="HealthCare" 
                    textColor={darkMode ? "text-white" : "text-[#00609a]"} 
                    logoClassName="w-10 h-10" 
                    onClick={() => navigate('/')} 
                />
                <span className={`text-[10px] font-medium tracking-wide uppercase mt-0.5 ml-14 opacity-70 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>Dashboard Panel</span>
            </div>
            <p className='border px-2.5 py-0.5 rounded-full border-primary/20 text-secondary bg-primary/5'>{aToken ? 'Welcome, Admin!' : 'Doctor Appointment App'}</p>
        </div>
        
        <div className='flex items-center gap-4'>
            <button 
                onClick={toggleTheme}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                className='flex items-center gap-2 cursor-pointer px-4 sm:px-5 py-2.5 rounded-full bg-[var(--app-surface)] border border-[var(--app-ink)]/10 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 font-medium text-sm text-[var(--app-ink)] group'
            >
                {darkMode ? (
                    <>
                        <svg className="w-4 h-4 text-yellow-400 group-hover:rotate-90 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 3.22a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.415l-.708-.707a1 1 0 010-1.415zM16 10a1 1 0 011 1h1a1 1 0 110 2h-1a1 1 0 01-1-1v-1zm-3.22 4.22a1 1 0 010 1.415l-.707.708a1 1 0 01-1.415-1.414l.707-.708a1 1 0 011.415 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-3.22a1 1 0 01-1.415 0l-.708-.707a1 1 0 011.414-1.415l.708.707a1 1 0 010 1.415zM4 10a1 1 0 01-1-1H2a1 1 0 110-2h1a1 1 0 011 1v1zm3.22-4.22a1 1 0 010-1.415l.707-.708a1 1 0 011.415 1.414l-.707.708a1 1 0 01-1.415 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd"></path></svg>
                        <span className="hidden sm:inline">Light Mode</span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4 text-blue-500 group-hover:-rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        <span className="hidden sm:inline">Dark Mode</span>
                    </>
                )}
            </button>
            <button className='rounded-full bg-linear-to-r from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition duration-200 hover:-translate-y-0.5 hover:from-primary/90 hover:to-secondary/90' 
                onClick={logoutHandler}>
                Logout
            </button>
        </div>
    </div>
  )
}

export default Navbar