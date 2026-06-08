import React from 'react'
import contact_image from '../assets/assets_frontend/contact_image.png' // adjust path as needed; 

const Contact = () => {
  return (
    <div>
        <div className='text-center text-2xl pt-10 text-[var(--app-ink)]'>
            <p> CONTACT <span className='text-[var(--app-ink)] font-semibold'> US </span></p>
        </div>

        <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

            <img  className ='w-full md:max-w-[360px]' src={contact_image} alt="" />

            <div className='flex flex-col justify-center items-start gap-6'>
                <p className='text-[var(--app-ink)] text-lg font-semibold'>OUR OFFICE </p>
                <p className='text-[var(--app-ink)] opacity-75'> 54709 Willms Station <br />Suite 350, Washington, USA</p>
                <p className='text-[var(--app-ink)] opacity-75'> Tel: (415) 555-0132 <br />  Email: greatstackdev@gmail.com</p>
                <p className='font-semibold text-lg text-[var(--app-ink)]'> Careers at PRESCRIPTO</p>
                <p className='text-[var(--app-ink)] opacity-75'> Learn more about our teams and job openings.</p> 
                <button className='border border-[var(--app-ink)] px-8 py-4 text-sm  hover:bg-[var(--app-ink)] hover:text-[var(--app-surface)] transition-all duration-500 cursor-pointer '>Explore Jobs</button>
            </div>
        </div>

    </div>
  )
}

export default Contact
