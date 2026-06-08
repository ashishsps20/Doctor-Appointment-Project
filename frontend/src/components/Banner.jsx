import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {


    const navigate = useNavigate();


  return (
    <div className='flex bg-gradient-to-r from-primary via-primary to-secondary rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 shadow-lg shadow-primary/20 overflow-hidden relative'>
        {/* Decorative background blobs */}
        <div className='absolute top-[-20%] left-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-glow'></div>
        <div className='absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow' style={{ animationDelay: '1.5s' }}></div>
        {/* ------left  side---- */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
                <p>Book Appointment</p>
                <p className='mt-4'>With 100+ Trusted Doctors</p>
            </div>
            <button onClick={()=>{ navigate('/login'); scrollTo(0,0)}}  className='bg-white text-sm sm:text-base text-secondary font-medium px-8 py-3 rounded-full mt-6 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-300'>Create account</button>
        </div>

        {/* -----right side -------*/}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md animate-[float_6s_ease-in-out_infinite]' style={{ animationDelay: '0.5s' }} src={assets.appointment_img} alt=''/>
        </div>
    </div>
  )
}

export default Banner