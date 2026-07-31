import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-primary via-primary to-secondary rounded-2xl px-6 md:px-10 lg:px-20 shadow-lg shadow-primary/20 overflow-hidden relative'> 
      {/* Decorative background blobs */}
      <div className='absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-glow'></div>
      <div className='absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow' style={{ animationDelay: '1s' }}></div>
      {/* -----left Side-----*/}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px] '>
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
          Book Appointment <br/> With Trusted Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
          <img className='w-28' src={assets.group_profiles} alt=''/>
          <p>Simply browse through our extinsive lis of trusted doctors, <br className='hidden sm:block'/> schedule your appointment hassle-free.</p>
        </div>
        <a href='#speciality' className='group flex items-center gap-2 bg-white px-8 py-3 rounded-full text-secondary font-medium text-sm m-auto md:m-0 shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 hover:scale-105 transition-all duration-300'>
          Book appointment <img className='w-3 transition-transform duration-300 group-hover:translate-x-1' src={assets.arrow_icon} alt=''/>
        </a>
        
      </div>

      {/* -----Right Side-----*/}
      <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-[-10px] h-auto rounded-lg drop-shadow-2xl animate-[float_6s_ease-in-out_infinite] mb-[-10px] md:mb-0' src={assets.header_img2} alt=''/>
      </div>
    </div>
  )
}

export default Header