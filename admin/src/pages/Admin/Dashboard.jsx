import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { aToken, dashData, getDashData, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])
  return dashData && (
    <div className='m-5'>

      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-[var(--app-surface)] shadow-sm p-4 min-w-52 rounded border-2 border-[var(--app-ink)]/10 cursor-pointer hover:scale-105 transition-all text-[var(--app-ink)]'>
          <img className='w-14' src={assets.doctor_icon} alt='' />
          <div>
            <p className='text-xl font-semibold opacity-90'>{dashData.doctors}</p>
            <p className='opacity-70'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-[var(--app-surface)] shadow-sm p-4 min-w-52 rounded border-2 border-[var(--app-ink)]/10 cursor-pointer hover:scale-105 transition-all text-[var(--app-ink)]'>
          <img className='w-14 dark-invert' src={assets.appointment_icon} alt='' />
          <div>
            <p className='text-xl font-semibold opacity-90'>{dashData.appointments}</p>
            <p className='opacity-70'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-[var(--app-surface)] shadow-sm p-4 min-w-52 rounded border-2 border-[var(--app-ink)]/10 cursor-pointer hover:scale-105 transition-all text-[var(--app-ink)]'>
          <img className='w-14' src={assets.patients_icon} alt='' />
          <div>
            <p className='text-xl font-semibold opacity-90'>{dashData.patients}</p>
            <p className='opacity-70'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-[var(--app-surface)] shadow-sm border border-[var(--app-ink)]/10 rounded mt-10'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b border-[var(--app-ink)]/10 text-[var(--app-ink)]'>
          <img src={assets.list_icon} alt="" className="invert dark:invert-0" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>
        <div className='pt-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-[var(--app-ink)]/5 transition-colors' key={index}>
                <img className='rounded-full w-10' src={item.docData.image} alt="" />
                <div className='flex-1 text-sm text-[var(--app-ink)]'>
                  <p className='font-medium opacity-90'>{item.docData.name}</p>
                  <p className='opacity-70'>{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Dashboard