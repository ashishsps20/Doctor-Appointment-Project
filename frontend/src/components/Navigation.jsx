import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
const Navigation = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData, darkMode, toggleTheme } = useContext(AppContext);

    const [open, setOpen] = useState(false);

    const logoutHandler = () => {
        setToken('');
        localStorage.removeItem('token');

        // 🌟 Chat ka kachra hamesha ke liye flush!
        sessionStorage.removeItem('prescripto_current_chat');

        setOpen(false);

        window.location.replace('/'); // Hard reload jisse sab fresh ho jaye
    }

    return (
        <nav>
            <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-primary/15 bg-[var(--app-surface)] text-[var(--app-ink)] transition-colors duration-300'>
                <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt='' />
                <ul className='hidden md:flex items-center gap-5 font-medium'>
                    <NavLink to='/'>
                        <li className='py-1'>Home</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/doctors'>
                        <li className='py-1'>All Doctors</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/about'>
                        <li className='py-1'>About</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/contact'>
                        <li className='py-1'>Contact</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/symptom-checker'>
                        <li className='py-1'>Symptom Checker</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                </ul>
                <div className='flex items-center gap-4 '>
                    {/* Theme Toggle Button */}
                    <button 
                        onClick={toggleTheme}
                        className='hidden md:inline-flex px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors font-medium text-sm'
                        title={darkMode ? 'Light Mode' : 'Dark Mode'}
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    {
                        token
                            ? <div className='flex items-center gap-2 relative' onClick={() => setOpen(prev => !prev)} onMouseLeave={() => setOpen(false)}>

                                {/* 🌟 FIX: Bulletproof Image Fallback */}
                                <img
                                    className='w-8 h-8 rounded-full object-cover'
                                    src={userData?.image ? userData.image : assets.profile_pic}
                                    onError={(e) => { e.currentTarget.src = assets.profile_pic }}
                                    alt='Profile'
                                />

                                <div className={`absolute top-0 right-0 pt-14 text-sm font-medium z-20 ${open ? 'block' : 'hidden'}`}>
                                    <div className='min-w-48 bg-[var(--app-surface)] rounded-2xl flex flex-col gap-2 p-3 shadow-lg border border-primary/10 text-[var(--app-ink)] overflow-y-hidden max-h-60 hover:overflow-y-auto show-scrollbar text-sm'>
                                        <p onClick={(e) => { e.stopPropagation(); setOpen(false); navigate('/my-profile') }} className='hover:text-primary cursor-pointer py-2 px-3 rounded hover:bg-primary/10 transition-colors text-sm'>My Profile</p>
                                        <p onClick={(e) => { e.stopPropagation(); setOpen(false); navigate('/my-appointments') }} className='hover:text-primary cursor-pointer py-2 px-3 rounded hover:bg-primary/10 transition-colors text-sm'>My Appointments</p>
                                        <hr className='my-1 border-primary/15' />
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                                            className='w-full text-left py-2 px-3 rounded hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors font-medium text-sm'
                                        >
                                            {darkMode ? 'Light Mode' : 'Dark Mode'}
                                        </button>
                                        <hr className='my-1 border-primary/15' />
                                        <p onClick={(e) => { e.stopPropagation(); setOpen(false); logoutHandler() }} className='hover:text-primary cursor-pointer py-2 px-3 rounded hover:bg-primary/10 transition-colors text-sm'>Logout</p>
                                    </div>
                                </div>
                            </div>
                            : <button onClick={() => navigate('/login')} className='bg-primary cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block shadow-sm hover:bg-secondary transition-colors'>Create account</button>
                    }
                    <button onClick={() => setShowMenu(true)} className='md:hidden p-2 text-[var(--app-ink)]'>
                        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M4 6h16' />
                            <path d='M4 12h16' />
                            <path d='M4 18h16' />
                        </svg>
                    </button>
                    {/*----- Mobile menu -----*/}
                    <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden bg-[var(--app-surface)] z-20 transition-all duration-150`}>
                        <div className='flex items-center justify-between px-5 py-6'>
                            <img className='w-36' src={assets.logo} alt='' />
                            <div className='flex items-center gap-3'>
                                <img src={assets.cross_icon} className='w-7' onClick={() => setShowMenu(false)} alt='' />
                            </div>
                        </div>
                        <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded-full inline-block hover:bg-primary/10 hover:text-primary'>HOME</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p className='px-4 py-2 rounded-full inline-block hover:bg-primary/10 hover:text-primary'>ALL DOCTORS</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/about'><p className='px-4 py-2 rounded-full inline-block hover:bg-primary/10 hover:text-primary'>ABOUT</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/contact'><p className='px-4 py-2 rounded-full inline-block hover:bg-primary/10 hover:text-primary'>CONTACT</p></NavLink>
                            <NavLink onClick={() => setShowMenu(false)} to='/symptom-checker'><p className='px-4 py-2 rounded-full inline-block hover:bg-primary/10 hover:text-primary'>SYMPTOM CHECKER</p></NavLink>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation


{/* ---previous code --- */ }
{/*// <div className='flex items-center gap-2 cursor-pointer group relative'>
                    //     <img className='w-8 rounded-full' src={assets.profile_pic} alt=''/>
                    //     <img className='w-2.5' src={assets.dropdown_icon} alt=''/>
                    //     <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                    //         <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    //             <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    //             <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    //             <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    //         </div>
                    //     </div>
                    // </div>*/}