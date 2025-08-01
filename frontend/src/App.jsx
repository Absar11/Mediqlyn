import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Docters from './pages/Docters'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import Myappointments from './pages/Myappointments'
import Apointment from './pages/Apointment'
import Navbar from './componants/Navbar'
import Footer from './componants/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
       <Routes>
         <Route path='/' element={<Home/>}/>                 
         <Route path='/doctors' element={<Docters/>}/>                 
         <Route path='/doctors/:speciality' element={<Docters/>}/>                 
         <Route path='/about' element={<About/>}/>                 
         <Route path='/contact' element={<Contact/>}/>                 
         <Route path='/myprofile' element={<Myprofile/>}/>                 
         <Route path='/myappointments' element={<Myappointments/>}/>                 
         <Route path='/appointment/:docId' element={<Apointment/>}/>                 
         <Route path='/login' element={<Login/>}/>                 
       </Routes> 
       <Footer/> 
    </div>
   
  )
}

export default App