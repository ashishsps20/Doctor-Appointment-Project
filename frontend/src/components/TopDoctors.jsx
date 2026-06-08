import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors, formatDocNameForSlug} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[var(--app-ink)] md:mx-10'>
        <h1 className='text-3xl font-semibold text-[var(--app-ink)]'>Top Doctors To Book</h1>
        <p className='sm:w-1/2 text-center text-sm text-[var(--app-ink)]'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-(--my-grid-column) gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{ navigate(`/appointment/${formatDocNameForSlug(item.name)}`); scrollTo(0,0);}} className='group border border-[var(--app-ink)]/5 rounded-xl overflow-hidden cursor-pointer bg-[var(--app-surface)] shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 transition-all duration-500'>
                    <div className='bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500'>
                        <img className='w-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt=''/>
                    </div>
                    <div className='p-5'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                            <div className='relative flex items-center justify-center w-2 h-2'>
                                <p className={`absolute w-full h-full ${item.available ? 'bg-green-500 animate-ping' : 'bg-gray-500'} rounded-full opacity-75`}></p>
                                <p className={`relative w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                            </div>
                            <p className='font-medium'>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-[var(--app-ink)] text-lg font-bold mt-1 group-hover:text-primary transition-colors'>{item.name}</p>
                        <p className='text-[var(--app-ink)] opacity-70 text-sm font-medium'>{item.speciality}</p>
                    </div>
                </div>    
            ))}
        </div>
        <button onClick={()=>{navigate('/doctors'); scrollTo(0,0);}} className='group flex items-center gap-2 px-10 py-3 mt-10 bg-transparent text-[var(--app-ink)] font-medium rounded-full border border-[var(--app-ink)]/20 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer'>
            Explore More
            <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
            </svg>
        </button>
    </div>
  )
}

export default TopDoctors