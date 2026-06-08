import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'


const DoctorProfile = () => {

  const { dToken, backendUrl, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit,setIsEdit] = useState(false)

  const updateProfile = async () => {
    try{
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available
      }

      const { data } = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {headers: {dToken} })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }else{
        toast.error(data.message)
      }

    } catch(error){
      console.log(error)
      toast.error(error.message || 'Failed to update profile')
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])


  return profileData && (
    <div>

      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/10 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="Profile" />
        </div>
        <div className='flex-1 border border-[var(--app-ink)]/10 rounded-lg p-8 py-7 bg-[var(--app-surface)] shadow-sm text-[var(--app-ink)]'>
          {/* ----- Doc Info : name , degree, experience */}
          <p className='flex items-center gap-2 text-3xl font-medium opacity-90'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 opacity-80'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border border-[var(--app-ink)]/20 text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/*---- Doc ABOUT----- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium mt-3 opacity-90'>About:</p>
            <p className='text-sm opacity-80 max-w-175 mt-1'>
              {profileData.about}
            </p>
          </div>

          <p className='opacity-80 font-medium mt-4'>
            Appointment fee: <span className='opacity-100 font-semibold'>{currency}{isEdit ? <input type="number" className="bg-transparent outline-none border-b border-[var(--app-ink)]/20 text-[var(--app-ink)]" value={profileData.fee} onChange={(e) => setProfileData(prev => ({...prev, fee: e.target.value}))} /> : profileData.fee}</span>
          </p>

          <div className='flex gap-2 py-2 opacity-80'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" className="bg-transparent outline-none border-b border-[var(--app-ink)]/20 w-full mb-1 text-[var(--app-ink)]" onChange={(e)=>setProfileData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1}/> : profileData.address.line1}
              <br/>
              {isEdit ? <input type="text" className="bg-transparent outline-none border-b border-[var(--app-ink)]/20 w-full text-[var(--app-ink)]" onChange={(e)=>setProfileData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2}/> : profileData.address.line2}
              </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfileData(prev => ({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" name="" id=""/>
            <label htmlFor="">Availability</label>
          </div>
          {
            isEdit 
            ? <button onClick={updateProfile}className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white'>Save</button>
            : <button onClick={() => setIsEdit(true)}className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white'>Edit</button>
          }

        </div>
      </div>

    </div>
  )
}

export default DoctorProfile