import React,{useState} from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const{backendURL,token,setToken} = useContext(AppContext)
    const [state,setState] = useState('Sign Up')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const Navigate = useNavigate();
    
    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if(state === 'Sign Up'){
                const {data} = await axios.post(`${backendURL}/api/user/register`, {name,email,password})
                if(data?.success){
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success(data?.message)
                } else {
                    toast.error(data?.message)
                }
            } else {
                const {data} = await axios.post(`${backendURL}/api/user/login`, {email,password})
                if(data?.success){
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                    toast.success(data?.message)
                } else {
                    toast.error(data?.message)
                }
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'An error occurred')
        }

    }

    useEffect(() => {
        if(token){
            Navigate('/');
        }
    }, [token])

  return (
   <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center relative z-10'>
    <div className='flex flex-col gap-3 m-auto items-start p-8 sm:p-10 min-w-[340px] sm:min-w-96 border border-[var(--app-ink)]/10 bg-[var(--app-surface)] rounded-2xl text-[var(--app-ink)]/80 text-sm shadow-xl shadow-[var(--app-ink)]/5 hover:shadow-2xl transition-shadow duration-500'>
        <p className='text-2xl font-bold text-[var(--app-ink)]'> {state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p className='mb-4'>Please {state === 'Sign Up' ? "Sign Up" : "Login"} to book appointment </p>
        {
            state === "Sign Up" &&  <div className='w-full'>
            <p className='font-medium text-[var(--app-ink)] mb-1'> Full Name</p>
            <input className='border border-[var(--app-ink)]/20 bg-transparent text-[var(--app-ink)] rounded-lg w-full p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all' type="text" onChange={(e) => setName(e.target.value)} value ={name} required />
        </div>
        }
       
        <div className='w-full mt-2'>
            <p className='font-medium text-[var(--app-ink)] mb-1'> Email</p>
            <input className='border border-[var(--app-ink)]/20 bg-transparent text-[var(--app-ink)] rounded-lg w-full p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all' type="email" onChange={(e) => setEmail(e.target.value)} value ={email} required />
        </div>
        <div className='w-full mt-2 mb-4'>
            <p className='font-medium text-[var(--app-ink)] mb-1'> Password</p>
            <input className='border border-[var(--app-ink)]/20 bg-transparent text-[var(--app-ink)] rounded-lg w-full p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all' type="password" onChange={(e) => setPassword(e.target.value)} value ={password} required />
        </div>
        <button type='submit' className='bg-primary text-white font-medium w-full py-3 rounded-full text-base shadow-md hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer'>{state === 'Sign Up' ? "Create Account" : "Login"} </button>
        {
            state === "Sign Up"
             ? <p className='mt-2 w-full text-center'> Already have an Account? <span  onClick={() => setState('Login') }  className='text-primary font-medium hover:underline cursor-pointer transition-all'> Login here</span></p>
            : <p className='mt-2 w-full text-center'> Create an new account <span  onClick={() => setState('Sign Up') } className='text-primary font-medium hover:underline cursor-pointer transition-all'> click here </span></p>
        }
    </div>

   </form>
  )
}

export default Login
