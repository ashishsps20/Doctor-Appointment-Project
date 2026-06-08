import React from 'react'
import contact_image from '../assets/assets_frontend/contact_image.png' // adjust path as needed; 

const Contact = () => {
    return (
        <div>
            <div className='text-center text-2xl pt-10 text-[var(--app-ink)]'>
                <p> CONTACT <span className='text-[var(--app-ink)] font-semibold'> US </span></p>
            </div>

            <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

                <div className='w-full md:max-w-[360px] relative group'>
                    <div className='absolute -inset-3 bg-gradient-to-r from-primary/40 to-blue-500/40 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-500'></div>
                    <img className='relative w-full rounded-2xl border-4 border-[var(--app-surface)] shadow-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]' src={contact_image} alt="Contact Prescripto" />
                </div>

                <div className='flex flex-col justify-center items-start gap-6'>
                    <p className='text-[var(--app-ink)] text-lg font-semibold'>OUR OFFICE </p>
                    <p className='text-[var(--app-ink)] opacity-75'> 54709 Willms Station <br />Suite 350, Washington, USA</p>
                    <p className='text-[var(--app-ink)] opacity-75'> Tel: (415) 555-0132 <br />  Email: greatstackdev@gmail.com</p>
                    <p className='font-semibold text-lg text-[var(--app-ink)]'> Careers at PRESCRIPTO</p>
                    <p className='text-[var(--app-ink)] opacity-75'> Learn more about our teams and job openings.</p>
                    <button className='group flex items-center gap-2 bg-[var(--app-ink)] text-[var(--app-surface)] px-8 py-3.5 text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg'>
                        Explore Jobs
                        <svg className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3'></path>
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default Contact
