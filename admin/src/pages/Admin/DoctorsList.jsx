import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

    useEffect(() => {
        getAllDoctors()
    }, [aToken])
    return (
        <div className='w-full rounded-lg bg-white p-6 shadow'>
            <h1 className='text-xl font-bold text-slate-700'>All Doctors</h1>
            <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {
                    doctors.map((doctor, index) => (
                        <div key={index} className='group w-full cursor-pointer overflow-hidden rounded-xl border border-primary/20 bg-white transition-all duration-300'>
                            <img
                                src={doctor.image}
                                alt={doctor.name}
                                className='w-full bg-primary/10 object-cover transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105'
                            />
                            <div className='p-4 '>
                                <p className='text-neutral-800 text-lg font-medium '>{doctor.name}</p>
                                <p className ="text-zinc-600 text-sm">{doctor.speciality}</p>

                                <div className='mt-3 flex items-center gap-2 text-sm text-slate-600'>
                                    <input type="checkbox" checked={doctor.available} 
                                        onChange={() => changeAvailability(doctor._id)} />
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorsList