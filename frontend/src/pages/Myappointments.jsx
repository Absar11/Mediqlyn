import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Myappointments = () => {

  const navigate = useNavigate()


  const { backendurl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setappointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {

    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];

  }

  const getuserappoint = async () => {
    try {

      const { data } = await axios.get(backendurl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setappointments(data.appointments.reverse())
        // console.log(data.appointments)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  const cancelappoint = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendurl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getuserappoint()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }


    } catch (error) {

      console.log(error);
      toast.error(error.message)

    }

  }

  const initpay = (order) => {

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendurl + '/api/user/verify-payment', response, { headers: { token } })
          if (data.success) {
            getuserappoint()
            navigate('/myappointments')
            toast.success(data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()



  }

  const payment = async (appointmentId) => {

    try {

      const { data } = await axios.post(backendurl + '/api/user/online-payment', { appointmentId }, { headers: { token } })

      if (data.success) {
        initpay(data.order)
      }

    } catch (error) {

    }

  }

  useEffect(() => {

    if (token) {
      getuserappoint()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
      <div>
        {appointments.slice(0, 5).map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
            <div>
              <img className='w-32 bg-[#d1ebe3] ' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className='text-zinc-700 font-medium mt-1' >Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p className='text-xs mt-1'>Date & Time: <span className='text-sm text-neutral-700 font-medium'>{slotDateFormat(item.slotDate)} | {item.slotsTime}</span></p>
            </div>



            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancel && item.payment && !item.iscompleted && <button className='sm:min-w-48 py-2 border mb-10 text-stone-500 rounded-sm bg-[#d1ebe3]'>paid</button>}
              {!item.cancel && !item.payment && !item.iscompleted && <button onClick={() => payment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-full hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancel && !item.payment && !item.iscompleted && <button onClick={() => cancelappoint(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-full hover:bg-red-400  hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancel && <button className='sm:min-w-48 py-2 border border-red-500 text-red-500 mb-10 rounded-sm'>Appointment Cancelled</button>}
              {!item.cancel && (!item.payment || item.payment) && item.iscompleted && <button className='sm:min-w-48 py-2 border mb-10 text-stone-500 rounded-sm bg-[#d1ebe3]'>Completed</button>}

            </div>

          </div>

        ))}
      </div>
      <div className='flex flex-col items-center'>
        <button className='bg-back text-gray-600 px-12 py-3 rounded-full mt-10' onClick={() => { navigate('/doctors'), scrollTo(0, 0) }}>More</button>
      </div>
    </div>
  )
}

export default Myappointments