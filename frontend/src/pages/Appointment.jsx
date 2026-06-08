import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RealatedDoctors from '../components/RealatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docSlug } = useParams();
  const { doctors, currencySymbol, backendURL, token, getDoctorsData, formatDocNameForSlug } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState([]);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');


  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => formatDocNameForSlug(doc.name) === docSlug);
    setDocInfo(docInfo);
  }

  const getAvailableSlots = async () => {
    setDocSlots([]);

    const slotsBooked = docInfo?.slots_booked || {};

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(20, 0, 0, 0);


      if (currentDate.getDate() === today.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);

      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate <= endTime) {

        // Add a lunch break: Doctor not available from 1:00 PM (13:00) to 5:00 PM (17:00)
        if (currentDate.getHours() >= 13 && currentDate.getHours() < 17) {
            currentDate.setHours(17);
            currentDate.setMinutes(0);
            continue;
        }

        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = slotsBooked[slotDate] && slotsBooked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prevSlots => ([
        ...prevSlots,
        timeSlots
      ]));
    }
  }


  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docSlug])

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo])


  useEffect(() => {
    console.log('docSlots', docSlots);
  }, [docSlots]);

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Select the time slot');
      return;
    }

    try {

      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(`${backendURL}/api/user/book-appointment`, { docId: docInfo._id, slotDate, slotTime }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return docInfo && (
    <div>
      {/* --------- Doctors Details---------- */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt='' />
        </div>

        <div className='flex-1 border border-[var(--app-ink)]/10 rounded-2xl p-8 py-7 bg-[var(--app-surface)] shadow-lg mx-2 sm:mx-0 mt-[-80px] sm:mt-0 relative z-10'>
          {/* ------------- Doc Info : name, degree, experience ------------- */}
          <div className={`flex items-center gap-2 text-md text-center ${docInfo.available ? 'text-green-500' : 'text-gray-500'}`}>
            <p className={`w-3 h-3 ${docInfo.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p><p>{docInfo.available ? 'Available' : 'Not Available'}</p>
          </div>
          <p className='flex items-center gap-2 text-3xl font-bold text-[var(--app-ink)] mt-3'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt='' />
          </p>
          <div className='flex items-center gap-2 text-sm mt-2 text-[var(--app-ink)]/80 font-medium'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-3 border border-[var(--app-ink)]/20 text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          {/* ------- Doctor About -------} */}
          <div className='mt-6'>
            <p className='flex items-center gap-2 text-sm font-semibold text-[var(--app-ink)]' >About <img className="w-4" src={assets.info_icon} alt='' /></p>
            <p className='text-sm text-[var(--app-ink)]/70 max-w-[700px] mt-2 leading-relaxed'>{docInfo.about}</p>
          </div>
          <p className='text-[var(--app-ink)]/70 font-medium mt-6'>
            Appointment fee: <span className='text-[var(--app-ink)] font-bold text-lg'>{currencySymbol}{docInfo.fee}</span></p>
        </div>

      </div>

      {/* --------- Booking Slots ---------- */}
      <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[var(--app-ink)]'>
        <p className='text-xl font-semibold mb-6'>Booking slots</p>
        <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 show-scrollbar'>
          {
            docSlots.length && docSlots.map((item, index) => {
              let slotDate = new Date();
              slotDate.setDate(slotDate.getDate() + index);
              return (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-20 rounded-full cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 ${slotIndex === index ? 'bg-primary text-white shadow-primary/30 border-transparent' : 'bg-[var(--app-surface)] border border-[var(--app-ink)]/20 hover:border-primary/50'}`} key={index}>
                <p className='text-sm font-medium opacity-80'>{daysOfWeek[slotDate.getDay()]}</p>
                <p className='text-xl font-bold mt-1'>{slotDate.getDate()}</p>
              </div>
            )})
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-auto mt-6 pb-4 show-scrollbar'>
          {docSlots.length && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)} className={`text-sm font-medium flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 ${item.time === slotTime ? 'bg-primary text-white shadow-primary/30 border-transparent' : 'bg-[var(--app-surface)] text-[var(--app-ink)] border border-[var(--app-ink)]/20 hover:border-primary/50'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-primary text-white text-base font-medium px-14 py-4 rounded-full mt-10 mb-6 cursor-pointer hover:bg-secondary transition-all duration-300 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-secondary/40 hover:-translate-y-1'>
          Book an appointment
        </button>

      </div>


      {/*--- Listing Related Doctors ---*/}
      <RealatedDoctors docId={docInfo._id} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointment