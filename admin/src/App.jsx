import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllApointments';
import DoctorsList from './pages/Admin/DoctorsList';
import AddDoctor from './pages/Admin/AddDoctor';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);


  return  aToken || dToken ? (
    <div className=' bg-[var(--app-surface)]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start gap-6 px-6 py-8'>
        <Sidebar />
        <Routes>
          <Route path='/' element={aToken ? <Dashboard /> : <DoctorDashboard/>} />

          {/* Admin Route */}
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/add-doctor' element={<AddDoctor />} />

          {/* Doctor Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App