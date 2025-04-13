import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div className='flex flex-col' id='speciality' >
        <h1>Find by Speciality</h1>
        <p>Simply browse through our extensive list of trusted doctors,<br/> schedule your appointment hassle-free</p>
        <div>
            {specialityData.map((item,index)=>(
                    <Link key={index} to={`/doctor/${item.speciality}`}>
                        <img src={item.image} alt=''/>
                        <p>{item.speciality}</p>
                    </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu