import React, { useEffect } from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/Doctorcontext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/Appcontext'
import {useNavigate} from 'react-router-dom'

const Dashboards = () => {

  const { dtoken, dashData, getDashData } = useContext(DoctorContext)
  const { Currency, slotDateFormat } = useContext(AppContext)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (dtoken) {

      getDashData()
    }

  }, [dtoken])
  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {Currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div onClick={()=>{navigate('/paitent-appointment')}} className="pt-4 border border-t-0">
            {dashData.latestAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-2 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancel ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.iscompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ): (

                  <p className="text-gray-500 text-xs font-medium">
                     Waiting
                  </p>

                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  )
}

export default Dashboards