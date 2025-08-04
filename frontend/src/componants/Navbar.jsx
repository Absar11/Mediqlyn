import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { MdMenu, MdClose, MdArrowDropDown } from 'react-icons/md'
import { assets } from '../assets/assets_frontend/assets'

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext)
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    isActive
      ? 'border-b-2 border-primary py-1 text-black'
      : 'py-1 text-gray-700 hover:text-black'

  return (
    <div className='flex items-center justify-between text-sm py-3 mb-5 border-b border-b-gray-400'>
      <img
        onClick={() => navigate('/')}
        className='w-28 cursor-pointer'
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className='hidden md:flex items-start gap-5 font-medium'>
        <NavLink to='/' className={linkClass}>
          HOME
        </NavLink>
        <NavLink to='/doctors' className={linkClass}>
          ALL DOCTORS
        </NavLink>
        <NavLink to='/about' className={linkClass}>
          ABOUT
        </NavLink>
        <NavLink to='/contact' className={linkClass}>
          CONTACT
        </NavLink>
      </ul>

      {/* Profile or Login Button */}
      <div className='flex items-center gap-4'>
        {token ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="User" />
            <MdArrowDropDown className="text-xl" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('myappointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <MdMenu onClick={() => setShowMenu(true)} className='text-2xl cursor-pointer md:hidden' />
      </div>

      {/* Mobile Drawer */}
      <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
        <div className='flex items-center justify-between px-5 py-6'>
          <img className='w-36' src={assets.logo} alt="Logo" />
          <MdClose onClick={() => setShowMenu(false)} className='text-3xl cursor-pointer' />
        </div>
        <ul className='flex flex-col items-center gap-2 px-5 mt-5 text-lg font-medium'>
          <NavLink onClick={() => setShowMenu(false)} to='/' className={linkClass}>HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={linkClass}>ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/about' className={linkClass}>ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' className={linkClass}>CONTACT</NavLink>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
