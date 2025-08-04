import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Docters = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setshowFilter] = useState(false)
  const navigate = useNavigate()

  const { doctors, getDoctorsData } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  useEffect(() => {
    getDoctorsData()
  }, [])

  // Helper to render stars
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-sm ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
      )
    }
    return stars
  }

  return (
    <div className='px-4 sm:px-8 py-4'>
      <p className='text-gray-600 mb-4'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5'>
        {/* Filter Sidebar */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`}
          onClick={() => setshowFilter(prev => !prev)}
        >
          Filter
        </button>

        <div className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, idx) => (
            <p
              key={idx}
              onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === spec ? 'bg-[#d1ebe3] text-black' : ""}`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                item.available ? navigate(`/appointment/${item._id}`) : toast.error('Doctor is Unavailable')
              }}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-6px] transition-all duration-300 bg-white'
            >
              <img
                className="h-[200px] w-full object-cover bg-[#d1ebe3]"
                src={item.image}
                alt="Doctor"
              />
              <div className='p-4'>
                {item.available ? (
                  <div className='flex items-center gap-2 text-sm text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                    <p>Available</p>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 text-sm text-red-500'>
                    <p className='w-2 h-2 bg-red-500 rounded-full'></p>
                    <p>Unavailable</p>
                  </div>
                )}
                <p className='text-gray-900 text-lg font-medium mt-1'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>

                {/* Ratings and Review Count */}
                <div className='flex items-center gap-1 mt-2 text-sm'>
                  {renderStars(Math.round(item.averageRating || 0))}
                  <span className='text-gray-500 ml-1'>
                    ({item.reviews?.length || 0} reviews)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Docters
