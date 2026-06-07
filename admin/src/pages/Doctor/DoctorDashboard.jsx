import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {

  const { dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment} = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)


  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken])

  return dashData && (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-primary/10 shadow-sm cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-secondary'>{currency}{dashData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-primary/10 shadow-sm cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-secondary'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded-xl border border-primary/10 shadow-sm cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-xl font-semibold text-secondary'>{dashData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm overflow-hidden mt-10'>
        <div className='flex items-center gap-2.5 px-4 py-4 border-b border-primary/10 bg-primary/5'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-primary/5 transition-colors' key={index}>
                <img className='rounded-full w-10' src={item.userData.image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {
                  item.cancelled
                    ? <p className='text-red-500 text-xs font-medium'>Cancelled</p>
                    : item.isCompleted
                      ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                      : <div className='flex'>
                        <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                      </div>
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard