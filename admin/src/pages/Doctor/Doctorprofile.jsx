import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/Doctorcontext'
import { useEffect } from 'react'
import { AppContext } from '../../context/Appcontext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Doctorprofile = () => {

  const { dtoken, docdata, getdocprofile, setdocdata, backendurl } = useContext(DoctorContext)
  const { Currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateprofile = async () => {

    try {

      const updatedata = {

        fees: docdata.fees,
        address: docdata.address,
        available: docdata.available,
      }

      const { data } = await axios.post(backendurl + '/api/doctor/update-profile', updatedata, { headers: { dtoken } })

      if (data.success) {

        toast.success(data.message)
        setIsEdit(false)
        getdocprofile()

      } else {
        toast.error(data.message)
      }

    } catch (error) {

      console.log(error);
      toast.error(error.message)


    }



  }

  useEffect(() => {

    getdocprofile()

  }, [dtoken])


  return (
    docdata && (

      <div>
        <div className="flex flex-col gap-4 m-5">

          <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
            {/* ------- Doc Info: name, degree, experience ------- */}

            <div className='flex flex-col sm:flex-row gap-6'>

              <div>

                <img
                  className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
                  src={docdata.image}
                  alt=""
                />

              </div>

              <div className='flex flex-col justify-center mt-4' >

                <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                  {docdata.name}
                </p>

                <div className="flex items-center gap-2 mt-1 text-gray-600">

                  <p>
                    {docdata.degree} - {docdata.speciality}
                  </p>
                  <button className="py-0.5 px-2 border text-xs rounded-full">
                    {docdata.experience}
                  </button>

                </div>

                <div className='mt-3'>
                  <p className="text-gray-600 font-medium mt-4">
                    Appointment fee:{" "}
                    <span className="text-gray-800">
                      {Currency}{" "}
                      {isEdit ? (
                        <input
                          type="number"
                          onChange={(e) =>
                            setdocdata((prev) => ({ ...prev, fees: e.target.value, }))
                          }
                          value={docdata.fees}
                          className='w-1/3 bg-gray-200 rounded px-2 '
                        />
                      ) : (
                        docdata.fees
                      )}
                    </span>
                  </p>

                  <div className="flex gap-2 py-2">
                    <p>Address:</p>
                    <p className="text-sm mt-1">
                      {isEdit ? (
                        <input type="text" onChange={(e) => setdocdata((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value }, }))
                        }
                          value={docdata.address.line1}
                          className='w-48 bg-gray-200 rounded mb-1 px-2'
                        />
                      ) : (
                        docdata.address.line1
                      )}
                      <br />
                      {isEdit ? (
                        <input type="text" onChange={(e) => setdocdata((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value }, }))}

                          value={docdata.address.line2}
                          className='w-48 bg-gray-200 rounded px-2'
                        />
                      ) : (
                        docdata.address.line2
                      )}
                    </p>
                  </div>

                  <div className="flex gap-1 pt-2">
                    <input onChange={() => isEdit && setdocdata((prev) => ({ ...prev, available: !prev.available, }))}
                      checked={docdata.available}
                      type="checkbox"
                      name=""
                      id=""
                      className='bg-gray-200 rounded'
                    />
                    <label htmlFor="">Available</label>
                  </div>

                </div>

              </div>



            </div>



            {/* ------- Doc About ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                About:
              </p>
              <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                {docdata.about}
              </p>
            </div>



            {isEdit ? (

              <div>
              <button
                onClick={updateprofile}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Save
              </button>

              <button onClick={()=>{setIsEdit(false)}} className='px-4 py-1 border border-red-500 text-sm rounded-full mt- mx-2 hover:bg-red-500 hover:text-white transition-all'>
                Cancel
              </button>

              </div>
              
              
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div >

    )
  )
}

export default Doctorprofile