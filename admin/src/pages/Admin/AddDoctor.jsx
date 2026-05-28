import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react';
import { useRef } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {

    const[docImage, setDocImage] = useState(null);
    const fileInputRef = useRef(null);
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');    
    const[experience, setExperience] = useState('1 Year');
    const[fees, setFees] = useState('');
    const[speciality, setSpeciality] = useState('General Physician');
    const[degree, setDegree] = useState('');
    const[address1, setAddress1] = useState('');
    const[address2, setAddress2] = useState('');
    const[about, setAbout] = useState('');

    const{backendUrl,aToken} = useContext(AdminContext)

    const onSubmitHandler = async(e) => {
        e.preventDefault();

        try {
            if(!docImage){
                return toast.error('Image not Selected')
            }

            const formData = new FormData();
            formData.append('image', docImage);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experience', experience);
            formData.append('fee', fees);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({line1: address1, line2: address2}));
            formData.append('about', about);

            // log formData values
            for (let pair of formData.entries()) {
                console.log(pair[0]+ ': ' + pair[1]);
            }

            const{data} = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
                headers: {
                    Authorization: `Bearer ${aToken}`
                }
            })

            if(!data) {
                toast.error('Failed to add doctor')
            }
            else{
                toast.success(data.message || 'Doctor added successfully')
                // clear all form fields
                setDocImage(null)
                if (fileInputRef.current) fileInputRef.current.value = ''
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFees('')
                setSpeciality('General Physician')
                setDegree('')
                setAddress1('')
                setAddress2('')
                setAbout('')
            }
        } catch (error) {
            // show backend response when available
            console.error('Error adding doctor:', error?.response?.data || error.message || error)
            toast.error(error?.response?.data?.message || 'Failed to add doctor')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-4 text-2xl font-semibold text-slate-800'>Add Doctor</p>

            <div className='w-full max-w-5xl max-h-[80vh] overflow-y-auto rounded-2xl border border-slate-100 bg-white px-8 py-8 shadow-sm'>
                <div className='mb-8 flex items-center gap-4 text-slate-500'>
                    <label htmlFor='doc-img'>
                        <img className='h-16 w-16 cursor-pointer rounded-full bg-slate-50 object-cover ring-1 ring-slate-200 transition hover:shadow-md' src={docImage ? URL.createObjectURL(docImage) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImage(e.target.files[0])} type="file" id='doc-img' hidden />
                    <p className='text-sm leading-5'>Upload Doctor <br /> picture</p>
                </div>
                <div className='flex flex-col items-start gap-10 text-slate-600 lg:flex-row'>
                    <div className='flex w-full flex-col gap-4 lg:flex-1'>
                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Doctor Name</p>
                            <input value={name} onChange={(e)=> setName(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="text" placeholder='Name' required />
                        </div>
                        
                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Doctor Email</p>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="email" placeholder='Email' required />
                        </div>
                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Doctor Password</p>
                            <input value={password} onChange={(e)=> setPassword(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="password" placeholder='Password' required />
                        </div>
                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Experience</p>
                            <select value={experience} onChange={(e)=> setExperience(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:bg-white' name="" id="">
                                <option value="1 Year">1 Year</option>
                                <option value="2 Years">2 Years</option>
                                <option value="3 Years">3 Years</option>
                                <option value="4 Years">4 Years</option>
                                <option value="5 Years">5 Years</option>
                                <option value="6 Years">6 Years</option>
                                <option value="7 Years">7 Years</option>
                                <option value="8 Years">8 Years</option>
                                <option value="9 Years">9 Years</option>
                                <option value="10+ Years">10+ Years</option>
                            </select>

                        </div>
                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Fees</p>
                            <input value={fees} onChange={(e)=> setFees(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="text" placeholder='Fees' required />
                        </div>
                    </div>
                    <div className='flex w-full flex-col gap-4 lg:flex-1'>
                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Speciality</p>
                            <select value={speciality} onChange={(e)=> setSpeciality(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:bg-white' name="" id="">
                                <option value="General Physician">General Physician</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Pediatrician">Pediatrician</option>
                                <option value="Psychiatrist">Psychiatrist</option>
                                <option value="Orthopedic">Orthopedic</option>

                                <option value="Gynecologist">Gynecologist</option>
                            </select>
                        </div>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Education</p>
                            <input value={degree} onChange={(e)=> setDegree(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="text" placeholder='Education' required />
                        </div>

                        <div className='flex flex-1 flex-col gap-1'>
                            <p className='text-sm font-medium text-slate-600'>Address</p>
                            <input value={address1} onChange={(e)=> setAddress1(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="text" placeholder='Address1' required />
                            <input value={address2} onChange={(e)=> setAddress2(e.target.value)} className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="text" placeholder='Address2' required />
                        </div>
                    </div>
                    </div>
                    
                    <div>
                        <p className='mt-4 mb-2 text-sm font-medium text-slate-600'>About Doctor</p>
                        <textarea value={about} onChange={(e)=> setAbout(e.target.value)} className='w-full rounded-lg border border-slate-200 bg-slate-50 px-4 pt-2 text-sm outline-none transition placeholder:text-slate-300 focus:border-blue-400 focus:bg-white' type="text" placeholder='Write about the doctor...' rows={5} />
                    </div>

                    <button type='submit' className='mt-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md cursor-pointer'>Add Doctor</button>

                </div>


        </form>
    )
}

export default AddDoctor
