import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import RelatedDoctors from '../componants/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'


const Apointment = () => {

  const { doctors, currencysymbol, backendurl, token, getDoctorsData } = useContext(AppContext)

  // -------doctors info code---------- 
  const { docId } = useParams()
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotsIndex, setSlotsIndex] = useState(0);
  const [slotsTime, setSlotsTime] = useState('');
  const daysweek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const fetchDocInfo = async () => {

    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)

  }

  // -------------- Appointmnet scheduling---------

  const getAvailableSlots = async () => {

    setDocSlots([])

    // getting cuurent date 
    let today = new Date()

    for (let i = 0; i < 12; i++) {
      // getting date with index

      let currentDate = new Date(today)
      currentDate.setDate(currentDate.getDate() + i)

      // setting end time of the date with index
      let endtime = new Date()
      endtime.setDate(today.getDate() + i)
      endtime.setHours(21, 0, 0, 0)

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)

      }
      else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }



      let timeslots = []


      while (currentDate < endtime) {

        let formattedtime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1
        let year = currentDate.getFullYear()


        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedtime

        const isslotavailable = !(docInfo?.slots_booked?.[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime))  


        if (isslotavailable) {
          
          // add slots to array
          timeslots.push({
            datetime: new Date(currentDate),
            time: formattedtime
          })
        }


        // increament current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }

      setDocSlots(prev => ([...prev, timeslots]))
    }

  }

  // booking appointment to store to backend
  const bookappointment = async () => {

    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotsIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1;
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendurl + '/api/user/appointment-booking', { docId, slotDate, slotsTime }, { headers: { token } })
      if (data.success) {

        toast.success(data.message)
        getDoctorsData()
        navigate('/myappointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {

      console.log(error);
      toast.error(error.message)


    }

  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])


  useEffect(() => {
    getAvailableSlots()
  }, [docInfo]);


  // useEffect(() => {

  //   console.log(docSlots);

  // }, [docSlots]);



  return docInfo && (
    <div>
      {/* ----------Doctor Details------------ */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className=' bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 mt-[-80px] sm:mt-0'>
          {/* -------Doc INFO: name, degree, experience---------- */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name}
            <img className='w-4' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border rounded-full text-xs border-gray-600'>{docInfo.experience}</button>
          </div>

          {/* -------doctor About-------- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img className='w-4 mt-0.5' src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
          </div>

          <p className='font-medium text-gray-500 mt-5 '>Appointment fee: <span className=' text-gray-600'>{currencysymbol} {docInfo.fees}</span> </p>
        </div>
      </div>

      {/* ----------Booking Slos--------- */}
      <div className=' sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-10 items-center w-full overflow-x-scroll mt-4 ml-5'>
          {
            docSlots.length && docSlots.map((item, index) => (
              <div onClick={() => setSlotsIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotsIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                <p>{item[0] && daysweek[item[0].datetime.getDay()]} </p>
                <p>{item[0] && item[0].datetime.getDate()} </p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlots.length && docSlots[slotsIndex].map((item, index) => (
            <p onClick={() => setSlotsTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotsTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
              {item.time.toLowerCase()}
            </p>

          ))}
        </div>
        <button className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6' onClick={bookappointment}>Book an appointment</button>
      </div>

      {/* --------------related doctors -------------- */}

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Apointment