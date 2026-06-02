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
    <div>
        {aToken && (
            <ul className='min-h-[calc(100vh-96px)] w-64 space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm'>
                <NavLink to='/admin-dashboard' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.home_icon} alt='Dashboard' className='w-5' />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to='/all-appointments' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.appointments_icon} alt='Appointments' className='w-5' />
                    <p>Appointments</p>
                </NavLink>
                <NavLink to='/add-doctor' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.add_icon} alt='Add Doctors' className='w-5' />
                    <p>Add Doctors</p>
                </NavLink>
                <NavLink to='/doctor-list' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.people_icon} alt='Doctors List' className='w-5' />
                    <p>Doctors List</p>
                </NavLink>
            </ul>
        )}
        {dToken && (
            <ul className='min-h-[calc(100vh-96px)] w-64 space-y-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm'>
                <NavLink to='/doctor-dashboard' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.home_icon} alt='Dashboard' className='w-5' />
                    <p>Dashboard</p>
                </NavLink>
                <NavLink to='/doctor-appointments' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.appointments_icon} alt='Appointments' className='w-5' />
                    <p>Appointments</p>
                </NavLink>
                <NavLink to='/doctor-profile' className ={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-3 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 ${isActive ? 'bg-slate-100 text-slate-900' : ''}`}>
                    <img src={assets.people_icon} alt='Doctors List' className='w-5' />
                    <p>Profile</p>
                </NavLink>
            </ul>
        )}
    </div>
  )
}

export default Sidebar