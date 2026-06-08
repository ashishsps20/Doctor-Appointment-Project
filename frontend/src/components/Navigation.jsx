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
        <nav className='sticky top-0 z-50 w-full backdrop-blur-md bg-[var(--app-surface)]/80 text-[var(--app-ink)] transition-colors duration-300 shadow-sm border-b border-[var(--app-ink)]/10'>
            <div className='flex items-center justify-between text-sm py-4 px-6 md:px-10 lg:px-20'>
                <img onClick={() => navigate('/')} className='w-44 cursor-pointer logo-img' src={assets.logo} alt='' />
                <ul className='hidden md:flex items-center gap-5 font-medium'>
                    <NavLink to='/'>
                        <li className='py-1 text-[var(--app-ink)] hover:text-primary transition-colors cursor-pointer'>Home</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/doctors'>
                        <li className='py-1 text-[var(--app-ink)] hover:text-primary transition-colors cursor-pointer'>All Doctors</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/about'>
                        <li className='py-1 text-[var(--app-ink)] hover:text-primary transition-colors cursor-pointer'>About</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/contact'>
                        <li className='py-1 text-[var(--app-ink)] hover:text-primary transition-colors cursor-pointer'>Contact</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                    <NavLink to='/symptom-checker'>
                        <li className='py-1 text-[var(--app-ink)] hover:text-primary transition-colors cursor-pointer'>Symptom Checker</li>
                        <hr className='border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden' />
                    </NavLink>
                </ul>
                <div className='flex items-center gap-4 '>
                    {/* Theme Toggle Button */}
                    <button 
                        onClick={toggleTheme}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        className='hidden md:flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full bg-[var(--app-surface)]/50 backdrop-blur-sm border border-[var(--app-ink)]/10 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-300 font-medium text-sm text-[var(--app-ink)] group'
                    >
                        {darkMode ? (
                            <>
                                <svg className="w-4 h-4 text-yellow-400 group-hover:rotate-90 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 3.22a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.415l-.708-.707a1 1 0 010-1.415zM16 10a1 1 0 011 1h1a1 1 0 110 2h-1a1 1 0 01-1-1v-1zm-3.22 4.22a1 1 0 010 1.415l-.707.708a1 1 0 01-1.415-1.414l.707-.708a1 1 0 011.415 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-3.22a1 1 0 01-1.415 0l-.708-.707a1 1 0 011.414-1.415l.708.707a1 1 0 010 1.415zM4 10a1 1 0 01-1-1H2a1 1 0 110-2h1a1 1 0 011 1v1zm3.22-4.22a1 1 0 010-1.415l.707-.708a1 1 0 011.415 1.414l-.707.708a1 1 0 01-1.415 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd"></path></svg>
                                <span>Light Mode</span>
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 text-blue-500 group-hover:-rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                                <span>Dark Mode</span>
                            </>
                        )}
                    </button>
                    {
                        token
                            ? <div className='flex items-center gap-2 relative cursor-pointer' onClick={() => setOpen(prev => !prev)} onMouseLeave={() => setOpen(false)}>

                                {/* 🌟 FIX: Bulletproof Image Fallback */}
                                <img
                                    className='w-8 h-8 rounded-full object-cover cursor-pointer'
                                    src={userData?.image ? userData.image : assets.profile_pic}
                                    onError={(e) => { e.currentTarget.src = assets.profile_pic }}
                                    alt='Profile'
                                />

                                <div className={`absolute top-0 right-0 pt-14 text-sm font-medium z-20 ${open ? 'block' : 'hidden'}`}>
                                    <div className='min-w-48 bg-[var(--app-surface)] rounded-2xl flex flex-col gap-2 p-3 shadow-lg border border-primary/10 text-[var(--app-ink)] overflow-y-hidden max-h-60 hover:overflow-y-auto show-scrollbar text-sm'>
                                        <p onClick={(e) => { e.stopPropagation(); setOpen(false); navigate('/my-profile') }} className='text-[var(--app-ink)] hover:text-primary cursor-pointer py-2 px-3 rounded hover:bg-primary/10 transition-colors text-sm'>My Profile</p>
                                        <p onClick={(e) => { e.stopPropagation(); setOpen(false); navigate('/my-appointments') }} className='text-[var(--app-ink)] hover:text-primary cursor-pointer py-2 px-3 rounded hover:bg-primary/10 transition-colors text-sm'>My Appointments</p>
                                        <hr className='my-1 border-primary/15' />
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
                                            className='w-full flex items-center gap-2 text-left py-2 px-3 rounded hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors font-medium text-sm text-[var(--app-ink)] group'
                                        >
                                            {darkMode ? (
                                                <>
                                                    <svg className="w-4 h-4 text-yellow-400 group-hover:rotate-90 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 3.22a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.415l-.708-.707a1 1 0 010-1.415zM16 10a1 1 0 011 1h1a1 1 0 110 2h-1a1 1 0 01-1-1v-1zm-3.22 4.22a1 1 0 010 1.415l-.707.708a1 1 0 01-1.415-1.414l.707-.708a1 1 0 011.415 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-3.22a1 1 0 01-1.415 0l-.708-.707a1 1 0 011.414-1.415l.708.707a1 1 0 010 1.415zM4 10a1 1 0 01-1-1H2a1 1 0 110-2h1a1 1 0 011 1v1zm3.22-4.22a1 1 0 010-1.415l.707-.708a1 1 0 011.415 1.414l-.707.708a1 1 0 01-1.415 0zM10 6a4 4 0 100 8 4 4 0 000-8z" clipRule="evenodd"></path></svg>
                                                    <span>Light Mode</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4 text-blue-500 group-hover:-rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                                                    <span>Dark Mode</span>
                                                </>
                                            )}
                                        </button>
                                        <hr className='my-1 border-primary/15' />
                                        <p onClick={(e) => { e.stopPropagation(); setOpen(false); logoutHandler() }} className='text-[var(--app-ink)] hover:text-primary cursor-pointer py-2 px-3 rounded hover:bg-primary/10 transition-colors text-sm'>Logout</p>
                                    </div>
                                </div>
                            </div>
                            : <button onClick={() => navigate('/login')} className='bg-primary cursor-pointer text-white px-8 py-3 rounded-full font-light hidden md:block shadow-sm hover:bg-secondary transition-colors'>Create account</button>
                    }
                    <button onClick={() => setShowMenu(true)} className='md:hidden p-2 cursor-pointer text-[var(--app-ink)]'>
                        <svg className='w-6 h-6' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                            <path d='M4 6h16' />
                            <path d='M4 12h16' />
                            <path d='M4 18h16' />
                        </svg>
                    </button>
                    {/*----- Mobile menu -----*/}
                    <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden bg-[var(--app-surface)] z-20 transition-all duration-150`}>
                        <div className='flex items-center justify-between px-5 py-6'>
                            <img className='w-36 logo-img' src={assets.logo} alt='' />
                            <div className='flex items-center gap-3'>
                                <button onClick={() => setShowMenu(false)} className='p-2 cursor-pointer text-[var(--app-ink)] hover:bg-primary/10 rounded-full transition-colors'>
                                    <svg className='w-7 h-7' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                        <line x1='18' y1='6' x2='6' y2='18' />
                                        <line x1='6' y1='6' x2='18' y2='18' />
                                    </svg>
                                </button>
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