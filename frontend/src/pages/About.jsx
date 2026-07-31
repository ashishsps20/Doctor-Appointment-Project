import React from 'react'
import about_image from '../assets/assets_frontend/about_image.png'; // adjust path as needed

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[var(--app-ink)]'>
        <p> ABOUT <span className='text-[var(--app-ink)] font-medium'>US</span></p>
      </div>

      <div  className='my-10 flex flex-col md:flex-row gap-12'>
        <div className='w-full md:max-w-[360px] relative group'>
          <div className='absolute -inset-3 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500'></div>
          <img className='relative w-full rounded-2xl border-4 border-[var(--app-surface)] shadow-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]' src={about_image} alt="About HealthCare" />
        </div>
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-[var(--app-ink)] opacity-80'>
            <p>Welcome to HealthCare, your trusted partner in managing your healthcare needs conveniently and efficiently.
             At HealthCare, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
            <p>HealthCare is committed to excellence in healthcare technology. enhance our platform,
            integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, HealthCare is here to support you every step of the way.</p>
            <b className='text-[var(--app-ink)]'>Our Vision </b>
            <p>Our vision at HealthCare is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>

      <div className='text-xl my-4'>
        <p> WHY <span className='text-[var(--app-ink)] font-semibold'> CHOOSE US </span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-6 mb-20'>
        <div className='flex-1 border border-[var(--app-ink)]/10 rounded-2xl px-8 md:px-12 py-10 flex flex-col gap-5 text-[15px] hover:bg-primary/5 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-[var(--app-ink)] cursor-pointer bg-[var(--app-surface)] shadow-sm'>
            <b className='text-lg'>Efficiency:</b>
            <p className='opacity-80 leading-relaxed'>Streamlined appointment scheduling that fits seamlessly into your busy lifestyle.</p>
        </div>
        <div  className='flex-1 border border-[var(--app-ink)]/10 rounded-2xl px-8 md:px-12 py-10 flex flex-col gap-5 text-[15px] hover:bg-primary/5 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-[var(--app-ink)] cursor-pointer bg-[var(--app-surface)] shadow-sm'>
            <b className='text-lg'>Convenience:</b>
            <p className='opacity-80 leading-relaxed'>Gain instant access to a trusted network of elite healthcare professionals in your area.</p>
        </div>
        <div  className='flex-1 border border-[var(--app-ink)]/10 rounded-2xl px-8 md:px-12 py-10 flex flex-col gap-5 text-[15px] hover:bg-primary/5 hover:border-primary/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-[var(--app-ink)] cursor-pointer bg-[var(--app-surface)] shadow-sm'>
            <b className='text-lg'>Personalization:</b>
            <p className='opacity-80 leading-relaxed'>Receive tailored recommendations and timely reminders to stay on top of your well-being.</p>
        </div>
      </div>

    </div>
  )
}

export default About
