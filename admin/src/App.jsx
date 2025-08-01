import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/Admincontext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Allapointment from './pages/Admin/Allapointment';
import AddDoctor from './pages/Admin/AddDoctor';
import Doctorlist from './pages/Admin/Doctorlist';
import { DoctorContext } from './context/Doctorcontext';
import Allappointments from './pages/Doctor/Allappointments';
import Dashboards from './pages/Doctor/Dashboards';
import Doctorprofile from './pages/Doctor/Doctorprofile';


const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dtoken } = useContext(DoctorContext)



  return aToken || dtoken ? (

    <div className='bg-[#F8F9FD]'>

      <ToastContainer />
      <Navbar />
      <div className=' flex items-start'>
        <Sidebar />
        
          <Routes>
            <Route path='/' element={<></>} />
            {/* Admin route */}
            <Route path='/admin-dashboard' element={<Dashboard />} />
            <Route path='/allappointment' element={<Allapointment />} />
            <Route path='/add-doctor' element={<AddDoctor />} />
            <Route path='/doctorlist' element={<Doctorlist />} />

            {/* Doctor route */}

            <Route path='/doctor-dashboard' element={<Dashboards/>}/>
            <Route path='/paitent-appointment' element={<Allappointments/>}/>
            <Route path='/doctor-profile' element={<Doctorprofile/>}/>
            

          </Routes>
        
     </div>

    </div>
  ) : (

    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App