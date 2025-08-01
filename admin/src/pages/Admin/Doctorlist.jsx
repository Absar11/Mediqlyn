import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/Admincontext'


const Doctorlist = () => {

  const { doctors, aToken, getAllDoctors, changeAvailablity} = useContext(AdminContext)

  useEffect(() => {

    if (aToken) {


      getAllDoctors()


    }

  }, [aToken])




  return (

    <div className='m-5 max-h-[90h] overflow-y-scroll'>
      <h1 className='text-lg font-medium '>All Doctors</h1>
    <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
      {
        doctors.map((item, index)=>(
          <div key={index} className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group'>
            <img className='bg-[#d1ebe3] group-hover:bg-primary transition-all duration-500' src={item.image} alt="doctor-image" />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p className='text-zinc-600 text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=> changeAvailablity(item._id)}  type="checkbox" checked={item.available} />
                <p>Available</p>
              </div>
              <p></p>
            </div>
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default Doctorlist