import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const { userData, setUserData, token, backendURL, loadUserProfileData } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('dob', userData.dob);
            formData.append('gender', userData.gender);
            formData.append('address', JSON.stringify(userData.address));

            image && formData.append('image', image);

            const { data } = await axios.post(`${backendURL}/api/user/update-profile`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'token': token,
                }
            });

            if (data.success) {
                toast.success(data.message || 'Profile updated successfully');
                setIsEdit(false);
                setImage(false);
                await loadUserProfileData(token);
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            toast.error('Failed to update profile');
            console.error('Failed to update profile', error);
        }
    }

    return userData && (
        <div className='max-w-2xl mx-auto my-8 p-8 bg-[var(--app-surface)]/95 rounded-3xl shadow-[0_8px_30px_rgba(15,23,42,0.08)] border border-[var(--app-ink)]/10 transition-colors duration-300'>
            
            {/* Header Section: Image & Name */}
            <div className='flex flex-col sm:flex-row items-center sm:items-start gap-8 animate-fade-in'>
                {/* Profile Image */}
                <div className='relative group'>
                    {isEdit ? (
                        <label htmlFor="image" className='cursor-pointer block relative overflow-hidden rounded-full w-40 h-40 shadow-lg transition-transform duration-300 hover:scale-105'>
                            <img 
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-50 transition-opacity" 
                                src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)} 
                                alt="Profile"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                                <img className="w-10 drop-shadow-md" src={assets.upload_icon} alt="Upload" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type='file' id="image" hidden />
                        </label>
                    ) : (
                        <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg border-4 border-[var(--app-surface)] ring-2 ring-primary/20 transition-transform duration-500 hover:scale-105">
                            <img 
                                className='w-full h-full object-cover' 
                                src={userData.image || assets.profile_pic} 
                                alt="Profile" 
                            />
                        </div>
                    )}
                </div>

                {/* Name */}
                <div className='flex-1 text-center sm:text-left mt-4 sm:mt-6'>
                    {isEdit ? (
                        <input 
                            className='w-full max-w-sm bg-[var(--app-surface)] text-3xl font-bold text-[var(--app-ink)] border-2 border-primary/20 rounded-xl px-4 py-2 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-inner' 
                            type='text' 
                            value={userData.name} 
                            onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your name"
                        />
                    ) : (
                        <h1 className='font-extrabold text-4xl text-[var(--app-ink)] tracking-tight'> 
                            {userData.name}
                        </h1>
                    )}
                </div>
            </div>

            <hr className='my-8 border-[var(--app-ink)]/10 w-full' />

            {/* Information Grid */}
            <div className='grid gap-8 md:grid-cols-2'>
                
                {/* Contact Information */}
                <div className='bg-[var(--app-ink)]/3 p-6 rounded-2xl border border-[var(--app-ink)]/10'>
                    <p className='text-xs font-bold tracking-widest text-[var(--app-ink)]/55 uppercase mb-5 flex items-center gap-2'>
                        Contact Information
                    </p>
                    <div className='flex flex-col gap-4 text-sm'>
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-[var(--app-ink)]/70'>Email id</span>
                            <span className='text-primary font-medium'>{userData.email}</span>
                        </div>
                        
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-[var(--app-ink)]/70'>Phone</span>
                            {isEdit ? (
                                <input 
                                    className='bg-[var(--app-surface)] border border-[var(--app-ink)]/15 text-[var(--app-ink)] focus:border-primary px-3 py-2 rounded-lg outline-none transition-shadow focus:shadow-md' 
                                    type='text' 
                                    value={userData.phone} 
                                    onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                />
                            ) : (
                                <span className='text-[var(--app-ink)]'>{userData.phone}</span>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-[var(--app-ink)]/70'>Address</span>
                            {isEdit ? (
                                <div className='flex flex-col gap-2'>
                                    <input 
                                        className='bg-[var(--app-surface)] border border-[var(--app-ink)]/15 text-[var(--app-ink)] focus:border-primary px-3 py-2 rounded-lg outline-none transition-shadow focus:shadow-md' 
                                        onChange={(e) => setUserData(prev => ({...prev, address: {...(prev.address || {}), line1: e.target.value} }))} 
                                        value={userData?.address?.line1 || ''} 
                                        type="text" 
                                        placeholder="Address Line 1"
                                    />
                                    <input 
                                        className='bg-[var(--app-surface)] border border-[var(--app-ink)]/15 text-[var(--app-ink)] focus:border-primary px-3 py-2 rounded-lg outline-none transition-shadow focus:shadow-md' 
                                        onChange={(e) => setUserData(prev => ({...prev, address: {...(prev.address || {}), line2: e.target.value} }))} 
                                        value={userData?.address?.line2 || ''} 
                                        type="text" 
                                        placeholder="Address Line 2"
                                    />
                                </div>
                            ) : (
                                <span className='text-[var(--app-ink)] leading-relaxed'>
                                    {userData?.address?.line1 || 'Address not updated'}
                                    {userData?.address?.line2 && <><br />{userData.address.line2}</>}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className='bg-[var(--app-ink)]/3 p-6 rounded-2xl border border-[var(--app-ink)]/10'>
                    <p className='text-xs font-bold tracking-widest text-[var(--app-ink)]/55 uppercase mb-5'>
                        Basic Information
                    </p>
                    <div className='flex flex-col gap-4 text-sm'>
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-[var(--app-ink)]/70'>Gender</span>
                            {isEdit ? (
                                <select 
                                    className='bg-[var(--app-surface)] border border-[var(--app-ink)]/15 text-[var(--app-ink)] focus:border-primary px-3 py-2 rounded-lg outline-none transition-shadow focus:shadow-md cursor-pointer' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                    value={userData.gender}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <span className='text-[var(--app-ink)]'>{userData.gender}</span>
                            )}
                        </div>
                        
                        <div className='flex flex-col gap-1'>
                            <span className='font-semibold text-[var(--app-ink)]/70'>Birthday</span>
                            {isEdit ? (
                                <input 
                                    className='bg-[var(--app-surface)] border border-[var(--app-ink)]/15 text-[var(--app-ink)] focus:border-primary px-3 py-2 rounded-lg outline-none transition-shadow focus:shadow-md cursor-pointer' 
                                    type='date' 
                                    onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                                    value={userData.dob} 
                                />
                            ) : (
                                <span className='text-[var(--app-ink)]'>{userData.dob}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='mt-10 flex justify-center sm:justify-start'>
                {isEdit ? (
                    <button 
                        className='bg-primary text-white font-medium px-10 py-3 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer' 
                        onClick={() => updateUserProfileData()}
                    >
                        Save Information
                    </button>
                ) : (
                    <button 
                        className='border-2 border-primary text-primary font-medium px-10 py-3 rounded-full hover:bg-primary hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer' 
                        onClick={() => setIsEdit(true)}
                    >
                        Edit Profile
                    </button>
                )}
            </div>
            
        </div>
    )
}

export default MyProfile;