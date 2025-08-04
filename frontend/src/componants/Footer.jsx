import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
    // Define active link style (if needed in future)
    const linkClass = ({ isActive }) =>
        isActive
            ? 'text-black'
            : 'text-gray-600 hover:text-black'

    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* -----left side----- */}
                <div>
                    <img className='mb-5 w-44' src={assets.logo} alt="MediQlyn Logo" />
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                    </p>
                </div>

                {/* -----center side----- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2'>
                        <NavLink to='/' className={linkClass}>Home</NavLink>
                        <NavLink to='/about' className={linkClass}>About us</NavLink>
                        <NavLink to='/contact' className={linkClass}>Contact us</NavLink>
                        <NavLink to='/privacy' className={linkClass}>Privacy policy</NavLink>
                    </ul>
                </div>

                {/* -----right side----- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91-XXXXX XXXXX</li>
                        <li>mediqlyn@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* ---------COPYRIGHT TEXT--------- */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>
                    Copyright © 2025 MediQlyn - All Rights Reserved.
                </p>
            </div>
        </div>
    )
}

export default Footer
