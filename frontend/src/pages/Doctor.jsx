import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {

  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();
  const { doctors, formatDocNameForSlug } = useContext(AppContext);

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
        <div className={`flex flex-col gap-1.5 text-sm bg-[var(--app-surface)] shadow-lg shadow-[var(--app-ink)]/5 border border-[var(--app-ink)]/5 rounded-2xl p-4 min-w-[240px] ${showFilters ? 'flex' : 'hidden sm:flex'}`}>
          <p className="font-semibold text-[var(--app-ink)]/90 mb-2 px-2 text-base tracking-wide">Specialties</p>
          <p onClick={() => { speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General%20physician') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'General physician' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>General physician</p>
          <p onClick={() => { speciality === 'Cardiologist' ? navigate('/doctors') : navigate('/doctors/Cardiologist') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'Cardiologist' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>Cardiologist</p>
          <p onClick={() => { speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'Gynecologist' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>Gynecologist</p>
          <p onClick={() => { speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'Dermatologist' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>Dermatologist</p>
          <p onClick={() => { speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'Pediatricians' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>Pediatricians</p>
          <p onClick={() => { speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'Neurologist' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>Neurologist</p>
          <p onClick={() => { speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') }} className={`w-full py-2.5 px-4 rounded-xl transition-all cursor-pointer font-medium ${speciality === 'Gastroenterologist' ? 'bg-primary/10 text-primary scale-[1.02] shadow-sm' : 'text-[var(--app-ink)]/70 hover:bg-[var(--app-ink)]/5 hover:text-[var(--app-ink)] hover:scale-[1.01]'}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-(--my-grid-column) gap-4 gap-y-6'>
          {
            filterDoc.map((item, index) => (
              <div onClick={() => navigate(`/appointment/${formatDocNameForSlug(item.name)}`)} className='border border-[var(--app-ink)]/20 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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