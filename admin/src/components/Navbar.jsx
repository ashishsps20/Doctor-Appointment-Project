import React from 'react'
import { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);

    const navigate = useNavigate();

    const logoutHandler = () => {
        navigate('/');
        aToken && setAToken(null);
        aToken && localStorage.removeItem('aToken');
        dToken && setDToken(null);
        dToken && localStorage.removeItem('dToken');
    }

  return (
    <div className='flex items-center justify-between bg-white px-6 py-4 shadow-md'>
        <div className='flex items-center gap-3 text-xl font-semibold text-slate-700'>
            <img className='w-36 sm:w-48 cursor-pointer' src={assets.admin_logo} alt="Logo" />
            <p className='border px-2.5 py-0.5 rounded-full border-gray500 text-gray-600'>{aToken ? 'Welcome, Admin!' : 'Doctor Appointment App'}</p>
        </div>
        <button className='rounded-full bg-linear-to-r from-blue-500 to-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition duration-200 hover:-translate-y-0.5 hover:from-blue-600 hover:to-indigo-700' 
            onClick={logoutHandler}>
            Logout
        </button>
    </div>
  )
}

export default Navbar