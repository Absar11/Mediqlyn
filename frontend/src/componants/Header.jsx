import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { assets } from '../assets/assets_frontend/assets'

const Header = () => {
  const headerImages = [
    assets.header_img,
    assets.header_img_2,
    assets.header_img_3,
  ]

  return (
    <div className="relative w-full h-[90vh] rounded-lg overflow-hidden">
      {/* Swiper as Background */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: false }}
        className="w-full h-full z-0"
      >
        {headerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`slide-${index}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 sm:p-10 md:p-14 max-w-3xl text-center text-white shadow-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            Book Appointment <br /> With Trusted Doctors
          </h1>
          <p className="mt-4 text-sm md:text-base font-light">
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment hassle-free.
          </p>
          <a
            href="#speciality"
            className="inline-block mt-6 bg-white text-gray-800 px-8 py-3 rounded-full text-sm hover:scale-105 transition-all duration-300"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  )
}

export default Header
