import React from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  return (
    <div className="w-full px-4 md:px-12 lg:px-20 text-gray-700">

      {/* Heading */}
      <div className="text-center text-3xl font-medium pt-10">
        CONTACT <span className="text-primary">US</span>
      </div>

      {/* Main Section */}
      <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Contact Image */}
        <img
          className="w-full max-w-md mx-auto"
          src={assets.contact_image}
          alt="Contact Illustration"
        />

        {/* Contact Details */}
        <div className="flex flex-col gap-6">
          {/* Office Info */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mb-2">OUR OFFICE</p>
            <div className="flex items-start gap-3 text-gray-600">
              <FiMapPin className="mt-1 text-lg" />
              <p>
                495 Angadpuram <br />
                Kanpur - 212632 <br />
                Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div className="flex items-center gap-3 text-gray-600">
              <FiPhone />
              <p>+91-XXXXX XXXXX</p>
            </div>
            <div className="flex items-center gap-3 text-gray-600 mt-2">
              <FiMail />
              <p>mediqlyn@gmail.com</p>
            </div>
          </div>

          {/* Careers */}
          <div>
            <p className="text-xl font-semibold text-gray-800 mt-4 mb-1">CAREERS AT MEDIQLYN</p>
            <p className="text-gray-600">Learn more about our teams and job openings.</p>
            <button className="mt-4 border border-black py-3 px-6 rounded hover:bg-black hover:text-white transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
