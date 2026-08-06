import React from 'react';
import { assets } from '../assets/assets_frontend/assets';

const Header = () => {
  return (
    <div className='relative bg-gradient-to-br from-primary via-primary to-secondary rounded-[2rem] mx-4 sm:mx-8 md:mx-10 mt-5 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)]'>
      
      {/* Background Orbs */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] animate-[pulse_4s_ease-in-out_infinite]'></div>
        <div className='absolute -bottom-32 -right-20 w-[500px] h-[500px] bg-secondary/30 rounded-full blur-[100px] animate-[pulse_6s_ease-in-out_infinite_1s]'></div>
      </div>

      {/* Main Flex Container */}
      <div className='flex flex-col md:flex-row relative z-10'>
        
        {/* ----- Left Side (Content) ----- */}
        <div className='md:w-1/2 flex flex-col items-start justify-center p-8 sm:p-10 md:py-16 lg:py-20 lg:px-16 gap-5 lg:gap-6'>
          
          {/* Glassmorphism Badge */}
          <div className='inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-1.5 pr-5 shadow-lg hover:scale-105 transition-transform duration-300'>
            <img className='h-10 ' src={assets.group_profiles} alt='Trusted Doctors' />
            <p className='text-white text-xs sm:text-sm font-medium tracking-wide'>
              Over 100+ Trusted Doctors
            </p>
          </div>

          {/* Headline */}
          <h1 className='text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-white font-extrabold leading-[1.1] tracking-tight'>
            Your Health, <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60'>
              Our Priority.
            </span>
          </h1>

          {/* Subtitle */}
          <p className='text-white/80 text-sm md:text-base lg:text-lg font-light leading-relaxed max-w-md'>
            Simply browse through our extensive list of trusted professionals and schedule your appointment completely hassle-free.
          </p>

          {/* CTA Button */}
          <a 
            href='#speciality' 
            className='group relative inline-flex items-center gap-3 bg-white px-8 py-3.5 sm:py-4 rounded-full text-primary font-bold text-sm sm:text-base overflow-hidden shadow-[0_8px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_35px_rgba(255,255,255,0.4)] transition-all duration-300 hover:-translate-y-1 mt-2'
          >
            <span className='relative z-10 flex items-center gap-2'>
              Book Appointment
              <img 
                className='w-3.5 sm:w-4 transition-transform duration-300 group-hover:translate-x-2' 
                src={assets.arrow_icon} 
                alt='Arrow'
              />
            </span>
          </a>
        </div>

        {/* ----- Right Side (Image) ----- */}
        <div className='md:w-1/2 w-full relative flex items-end justify-center md:justify-end mt-8 md:mt-0'>
          
          <div className='absolute bottom-10 right-10 w-3/4 h-3/4 bg-white/5 rounded-full blur-[60px] animate-[pulse_5s_ease-in-out_infinite]'></div>
          
          {/* 🌟 NAYA CODE: Added `md:-bottom-4` (negative bottom) to drag the image firmly down to cover the gap. */}
          <img 
            className='w-full max-w-[320px] md:max-w-[420px] lg:max-w-[500px] md:absolute md:-bottom-4 md:right-4 lg:right-10 h-auto object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.2)] animate-[float_6s_ease-in-out_infinite]' 
            src={assets.header_img2} 
            alt='Doctors' 
          />
        </div>
        
      </div>
    </div>
  )
}

export default Header;