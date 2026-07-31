import React from 'react'
import { useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets'
import FullLogo from './FullLogo'
import { AppContext } from '../context/AppContext';

const Footer = () => {
    const {darkMode} = useContext(AppContext);
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                {/* ----left section---- */}
                <div>
                    {/* <img className='mb-5 w-40 logo-img' src={assets.logo} alt='' /> */}
                    <FullLogo
                    text="HealthCare"
                    textColor={darkMode ? "text-white" : "text-[#00609a]"}
                    logoClassName="w-14 h-14"
                    onClick={() => navigate('/')}
                    />
                    <p className='w-full md:w-2/3 text-[var(--app-ink)] opacity-75 leading-6'>HealthCare is your trusted platform for seamless doctor appointments. Browse top-rated specialists, check real-time availability, and book consultations in just a few clicks. With features like AI-powered symptom checking, secure medical records, and instant appointment confirmations, we make healthcare accessible, convenient, and hassle-free for everyone.</p>
                </div>

                {/* ----middle section---- */}

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-[var(--app-ink)] opacity-75'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/* ----right section---- */}

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-[var(--app-ink)] opacity-75'>
                        <li>+1-212-456-7890</li>
                        <li>anyemailid@email.com</li>
                    </ul>

                </div>
            </div>
            {/* ---- Copyright text------- */}
            <div>
                <hr className='border-primary/10'/>
                <p className='py-5 text-sm text-center text-[var(--app-ink)] opacity-60'>Copyright 2026@ HealthCare - All Right Reserved</p>
            </div>
        </div>
    )
}

export default Footer