import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const normalizeSpeciality = (value = '') => value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/s$/, '')

  const applyFilter = () => {
    if (speciality) {
      const target = normalizeSpeciality(speciality)
      setFilterDoc(doctors.filter(doc => normalizeSpeciality(doc.speciality) === target))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])



  return (
    <div>
      <p className='text-[var(--app-ink)] opacity-80'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilters ? 'bg-primary text-white border-primary' : 'border-[var(--app-ink)] text-[var(--app-ink)]/80'}`} onClick={() => setShowFilters(prev => !prev)}>Filters</button>
        <div className={`flex flex-col gap-4 text-sm text-[var(--app-ink)] opacity-85 border border-[var(--app-ink)]/20 rounded-xl p-4 ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
          <p onClick={() => { speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General%20physician') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'General physician' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>General physician</p>
          <p onClick={() => { speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'Cardiologist' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>Cardiologist</p>
          <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'Gynecologist' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>Gynecologist</p>
          <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'Dermatologist' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>Dermatologist</p>
          <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'Pediatricians' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>Pediatricians</p>
          <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'Neurologist' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>Neurologist</p>
          <p onClick={() => { speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-[var(--app-ink)]/20 rounded transition-all cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-primary/10 text-primary' : 'text-[var(--app-ink)] opacity-90'}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-(--my-grid-column) gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${item._id}`)} className='border border-[var(--app-ink)]/20 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-primary/10' src={item.image} alt='' />
                <div className='p-4'>
                  <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-[var(--app-ink)] opacity-80'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-[var(--app-ink)]/50'} rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                  </div>
                  <p className='text-[var(--app-ink)] text-lg font-medium'>{item.name}</p>
                  <p className='text-[var(--app-ink)] opacity-70 text-sm'>{item.speciality}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Doctor