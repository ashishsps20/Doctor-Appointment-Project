import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors} = useContext(AppContext);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[var(--app-ink)] md:mx-10'>
        <h1 className='text-3xl font-semibold text-[var(--app-ink)]'>Top Doctors To Book</h1>
        <p className='sm:w-1/2 text-center text-sm text-[var(--app-ink)]'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-(--my-grid-column) gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{ navigate(`/appointment/${item._id}`); scrollTo(0,0);}} className='border border-primary/20 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-primary/10' src={item.image} alt=''/>
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-[var(--app-ink)] text-lg font-medium'>{item.name}</p>
                        <p className='text-[var(--app-ink)] opacity-70 text-sm'>{item.speciality}</p>
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