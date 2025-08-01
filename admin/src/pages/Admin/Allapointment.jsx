import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/Admincontext'
import { useEffect } from 'react'
import { AppContext } from '../../context/Appcontext'
import { assets } from '../../assets/assets_admin/assets'

const Allapointment = () => {

  const { aToken, appointments, getallappointment, cancelappoint } = useContext(AdminContext)
  const {calculateage, slotDateFormat, Currency } = useContext(AppContext)

  useEffect(() => {

    if (aToken) {

      getallappointment()

    }

  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <h1 className='mb-3 text-lg font-medium '>All Appointments</h1>
      <div className=' bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll '>
        <div className='hidden sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctors</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            
            <p className='max-sm:hidden'>{calculateage(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotsTime}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full bg-gray-200' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>

            <p>{Currency} {item.amount}</p>

             {item.cancel
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <img onClick={() => cancelappoint(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allapointment