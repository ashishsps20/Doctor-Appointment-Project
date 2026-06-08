import React,{useState} from 'react'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import axios from 'axios';
import { toast } from 'react-toastify';


const MyProfile = () => {

    const { userData, setUserData ,token,backendURL,loadUserProfileData} = useContext(AppContext);   

    const [isEdit, setIsEdit]  = useState(false)
    const[image,setImage] = useState(false);

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();
            formData.append('name', userData.name);
            formData.append('phone', userData.phone);
            formData.append('dob', userData.dob);
            formData.append('gender', userData.gender);
            formData.append('address', JSON.stringify(userData.address));

            image && formData.append('image', image);

            const { data} = await axios.post(`${backendURL}/api/user/update-profile`, formData, {
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
            }
            else{
                toast.error(data.message || 'Failed to update profile');
            }
        }
        catch(error){
            toast.error('Failed to update profile');
            console.error('Failed to update profile', error);
        }
    }   

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm text-[var(--app-ink)]'>
        {
            isEdit
            ?<label htmlFor="image" >
                <div className="inline-block relative cursor-pointer">
                    <img className="w-36 rounded opacity-70" src={image ? URL.createObjectURL(image) : (userData.image || assets.profile_pic)} alt=""/>
                    {!image && (
                        <img className="w-10 absolute bottom-12 right-12" src={assets.upload_icon} alt=""/>
                    )}
                </div>
                <input onChange={(e) => setImage(e.target.files[0])} type='file' id="image" hidden/>
            </label>
            :<img  className ='w-36 rounded' src={userData.image || assets.profile_pic} alt="" />
        }
    

        {
            isEdit
            ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type='text' value={userData.name} onChange={e => setUserData(prev => ({ ...prev,name:e.target.value}))}/>
            :<p className='font-medium text-3xl text-[var(--app-ink)] mt-4'> {userData.name}</p>
        }
        <hr  className=' bg-primary/25 h-[1px] border-none '/>
        <div>
            <p className='text-[var(--app-ink)] opacity-75 underline mt-3'> CONTACT INFORMATION</p>
            <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[var(--app-ink)] opacity-80'>
                <p className='font-medium text-[var(--app-ink)]'> Email id: </p>
                <p className='text-[var(--app-primary)]'>{ userData.email} </p>
                <p className='font-medium text-[var(--app-ink)]'> Phone: </p>
                {
                     isEdit
                     ? <input className='bg-[var(--app-surface)] text-[var(--app-ink)] border border-primary/20 max-w-52 px-2 py-1 rounded' type='text' value={userData.phone} onChange={e => setUserData(prev => ({ ...prev,phone:e.target.value}))}/>
                     :<p className='text-[var(--app-primary)] opacity-90'> {userData.phone}</p>
                }
                <p className='font-medium text-[var(--app-ink)]'> Address:</p>
                {
                    isEdit
                    ? <p>
                       {/* 🌟 NAYA CODE: (prev.address || {}) aur value={userData?.address?.line1 || ''} lagaya */}
                        <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev,address:{...(prev.address || {}),line1: e.target.value} }))} value={userData?.address?.line1 || ''} type="text" />
                        <br />
                        <input className='bg-gray-50' onChange={(e) => setUserData(prev => ({...prev,address:{...(prev.address || {}),line2: e.target.value} }))} value={userData?.address?.line2 || ''} type="text" />
                    </p>
                    :<p className='text-[var(--app-ink)] opacity-80'>
                        {/* 🌟 NAYA CODE: Optional chaining (?.) use ki */}
                        {userData?.address?.line1 || 'Address not updated'}
                        <br />
                        {userData?.address?.line2 || ''}
                      </p>
                }
            </div>
        </div>
        <div>
            <p className='text-[var(--app-ink)] opacity-75 underline mt-3'> BASIC INFORMATION </p>
            <div  className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[var(--app-ink)] opacity-80'>
                <p className='font-medium text-[var(--app-ink)]'> Gender:</p>
                {
                 isEdit
                 ? <select  className ='max-w-20 bg-[var(--app-surface)] text-[var(--app-ink)] border border-primary/20 rounded px-2 py-1' onChange={(e) => setUserData(prev => ({ ...prev,gender:e.target.value}))}>
                    <option value="Male">Male</option>
                    <option value="Female"> Female </option>
                 </select>
                 :<p className='text-[var(--app-ink)] opacity-90'> {userData.gender}</p>
                }
                <p className='font-medium text-[var(--app-ink)]'> Birthday:</p>
                {
                    isEdit
                    ? <input  className = 'max-w-28 bg-[var(--app-surface)] text-[var(--app-ink)] border border-primary/20 rounded px-2 py-1' type='date' onChange={(e) => setUserData(prev => ({ ...prev,dob:e.target.value}))} value={userData.dob} />
                    : <p className='text-[var(--app-ink)] opacity-80'> {userData.dob}</p>
                }
            </div>
        </div>
        <div className='mt-10'>
            {
                isEdit
                ? <button  className =' border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all cursor-pointer' onClick={() => updateUserProfileData()}> Save information</button>
                : <button  className =' border border-primary px-8 py-2 rounded-full  hover:bg-primary hover:text-white transition-all cursor-pointer' onClick={() => setIsEdit(true)}> Edit</button>
            }
        </div>
      
    </div>
  )
}

export default MyProfile   
