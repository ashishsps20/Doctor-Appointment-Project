import React, { useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { useContext } from 'react'
import { toast } from 'react-toastify'
const Login = () => {
    const [state, setState] = useState('Admin')
    const {setAToken, backendUrl} = useContext(AdminContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    const onSubmitHandler =async (event) => {
        event.preventDefault()
        try {
                        if(state === 'Admin'){
                                            const {data} = await axios.post(`${backendUrl}/api/admin/login`, {email, password});
                                            const token = data?.token || data?.atoken;
                                            if (data?.success && token) {
                                                    localStorage.setItem('aToken', token);
                                                    setAToken(token);
                                                    toast.success(data.message || 'Admin logged in successfully');
                                            }
                                            else{
                                                toast.error(data.message || 'Login failed');
                                            }
            }
            else{

            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Login failed')
        }
    }

    const toggleRole = () => {
        setState((prev) => (prev === 'Doctor' ? 'Admin' : 'Doctor'))
    }

    return (
        <div className='min-h-screen bg-[#f6f7fb] px-6 py-12'>
            <div className='mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center'>
                <form
                    className='w-full max-w-md rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_20px_40px_-25px_rgba(15,23,42,0.35)]'
                    onSubmit={onSubmitHandler}
                >
                    <h1 className='text-center text-2xl font-semibold text-slate-600'>
                        <span className='text-indigo-500'>{state}</span> Login
                    </h1>

                    <div className='mt-8 space-y-6 text-sm text-slate-600'>
                        <label className='block'>
                            Email
                            <input
                                className='mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100'
                                type='email'
                                required
                                placeholder='Enter your email'
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>

                        <label className='block'>
                            Password
                            <input
                                className='mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100'
                                type='password'
                                required
                                placeholder='Enter your password'
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </label>
                    </div>

                    <button
                        className='mt-8 w-full rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-600'
                        type='submit'
                    >
                        Login
                    </button>

                    <p className='mt-5 text-center text-sm text-slate-500'>
                        {state === 'Doctor' ? 'Admin Login?' : 'Doctor Login?'}{' '}
                        <button
                            className='cursor-pointer font-semibold text-indigo-500 hover:text-indigo-600'
                            type='button'
                            onClick={toggleRole}
                        >
                            Click here
                        </button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login