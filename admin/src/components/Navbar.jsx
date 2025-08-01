import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../context/Admincontext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/Doctorcontext'

const Navbar = () => {

    const { aToken, Setatoken } = useContext(AdminContext)

    const { setdtoken} = useContext(DoctorContext)


    const navigate = useNavigate()

    const logout = () => {
        navigate('/')

        if (aToken) {
            Setatoken('')
            localStorage.removeItem('aToken')
            
        }else{

            setdtoken('')
            localStorage.removeItem('dtoken')
        }
       

    }

    return (
        <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
            <div className='flex items-center gap-2 text-xs'>
                <img onClick={()=>{navigate('/')}} className='w-28 mb-3 cursor-pointer' src={assets.logo} alt="logo" />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full '>Logout</button>
        </div>
    )
}

export default Navbar