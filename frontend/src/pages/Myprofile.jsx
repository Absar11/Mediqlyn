import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets'
import axios from 'axios';
import { toast } from 'react-toastify';




const Myprofile = () => {

  const { userData, setuserData, backendurl, token, userprofile } = useContext(AppContext)

  const [Isedit, setIsedit] = useState(false);
  const [image, setimage] = useState(false);

  const updateprofile = async () => {

    try {

      const formdata = new FormData()

      formdata.append('name', userData.name)
      formdata.append('phone', userData.phone)
      formdata.append('address', JSON.stringify(userData.address))
      formdata.append('gender', userData.gender)
      formdata.append('dob', userData.dob)

      image && formdata.append('image', image)

      const { data } = await axios.post(backendurl + '/api/user/update-profile', formdata, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await userprofile()
        setIsedit(false)
        setimage(false)
      } else {
        toast.error(data.message)
      }




    } catch (error) {

      console.log(error);
      toast.error(error.message)

    }
  }



  return userData && (
    <div className='max-w-lg flex flex-col gap-3 text-sm'>

      {
        Isedit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute  bottom-12 right-12' src={image ? "" : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => setimage(e.target.files[0])} type="file" id="image" hidden />
          </label>
          :
          <img className='w-36 rounded' src={userData.image} alt="profile_img" />
      }



      {
        Isedit
          ? <input className='bg-gray-200 text-3xl font-medium max-w-60 mt-4 px-1 rounded-sm' type="text" value={userData.name} onChange={e => setuserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4 px-2'>{userData.name} </p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-1.5 mt-3 text-neutral-700'>
          <p className='font-medium my-2'>Email id:</p>
          <p className='text-blue-500 my-2'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {

            Isedit
              ? <input className='bg-gray-100 max-w-[13.5em] rounded-sm ' type="text" value={userData.phone} onChange={e => setuserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-400 '>{userData.phone} </p>
          }
          <p className='font-medium my-2'>Address:</p>
          {

            Isedit
              ? <p>
                <input className='bg-gray-50 rounded-sm mb-1 mt-2' type="text" onChange={e => setuserData(prev => ({ ...prev, address, line1: e.target.value }))} value={userData.address.line1} />
                <br />
                <input className='bg-gray-50 rounded-sm ' type="text" onChange={e => setuserData(prev => ({ ...prev, address, line2: e.target.value }))} value={userData.address.line2} />
              </p>
              : <p className='text-gray-500 my-2'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium my-3'>Gender:</p>
          {

            Isedit
              ? <select className='max-w-20 max-h-6 mt-3  bg-gray-100 rounded-sm' onChange={(e) => setuserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className='text-gray-400 my-3'>{userData.gender} </p>
          }
          <p className='font-medium'>DOB:</p>
          {
            Isedit
              ? <input className='max-w-[7rem] max-h-6 mb-3 text-center bg-gray-100 rounded-sm' type="date" onChange={(e) => setuserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div>

        {
          Isedit
            ? <button className=' my-3 border  border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500' onClick={() => setIsedit(updateprofile)} >Save information</button>
            : <button className='my-3 border  border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-500' onClick={() => setIsedit(true)} >Edit</button>
        }
      </div>

    </div>
  )
}

export default Myprofile