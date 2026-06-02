import React from 'react'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {
    const { aToken } = useContext(AdminContext)
    const { dToken } = useContext(DoctorContext)
  return (
    <div className='min-h-screen bg-white rounded-2xl'>
        {aToken && (
            <ul className='text-[#515151] mt-5'>
                <NavLink to='/admin-dashboard' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.home_icon} alt='Dashboard' className='w-5' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink to='/all-appointments' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.appointments_icon} alt='Appointments' className='w-5' />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink to='/add-doctor' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.add_icon} alt='Add Doctors' className='w-5' />
                    <p className='hidden md:block'>Add Doctors</p>
                </NavLink>
                <NavLink to='/doctor-list' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.people_icon} alt='Doctors List' className='w-5' />
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>
            </ul>
        )}
        {dToken && (
            <ul className='text-[#515151] mt-5'>
                <NavLink to='/doctor-dashboard' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.home_icon} alt='Dashboard' className='w-5' />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>
                <NavLink to='/doctor-appointments' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.appointments_icon} alt='Appointments' className='w-5' />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>
                <NavLink to='/doctor-profile' className ={({isActive}) => `flex items-center gap-3 px-3 py-3.5 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-blue-500' : ''}`}>
                    <img src={assets.people_icon} alt='Doctors List' className='w-5' />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        )}
    </div>
  )
}

export default Sidebar