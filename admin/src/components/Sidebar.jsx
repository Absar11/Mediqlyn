import React, { useContext } from 'react'
import { AdminContext } from '../context/Admincontext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { DoctorContext } from '../context/Doctorcontext';

const Sidebar = () => {

  const {aToken} = useContext(AdminContext);
  const {dtoken} = useContext(DoctorContext)



  return (
    <div className='min-h-screen max-h-[80vh] bg-white border-r'>
        {
          aToken && <ul className='text-[#515151] mt-5'>
            <NavLink to={'/admin-dashboard'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.home_icon} alt="home_icon" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink to={'/allappointment'}className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.appointment_icon} alt="appointment_icon" />
              <p>Appointment</p>
            </NavLink>

            <NavLink to={'/add-doctor'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.add_icon} alt="add_icon" />
              <p>Add Doctor</p>
            </NavLink>

            <NavLink to={'/doctorlist'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.people_icon} alt="people_icon" />
              <p>Doctors List</p>
            </NavLink>

            
          </ul>

        }
        {
          dtoken && <ul className='text-[#515151] mt-5'>
            <NavLink to={'/doctor-dashboard'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.home_icon} alt="home_icon" />
              <p>Dashboard</p>
            </NavLink>

            <NavLink to={'/paitent-appointment'}className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.appointment_icon} alt="appointment_icon" />
              <p>Appointment</p>
            </NavLink>


            {/* <NavLink to={'/paitent-report'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.add_icon} alt="people_icon" />
              <p>report</p>
            </NavLink> */}

            <NavLink to={'/doctor-profile'} className={({isActive})=> `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#d1ebe3] border-r-4 border-primary' : ''}`}>
              <img src={assets.profile} alt="add_icon" />
              <p>Profile</p>
            </NavLink>

            
          </ul>
        }
    </div>
  )
}

export default Sidebar