import axios from "axios" 
import { createContext, useState } from "react" 
import { toast } from "react-toastify" 

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const [dtoken, setdtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')
    const [docdata, setdocdata] = useState(false)
    const [appointment, setappointment] = useState([]) 
    const [dashData, setdashData] = useState(false)

    const backendurl = import.meta.env.VITE_BACKEND_URL

    const getdocprofile = async () => {

        try {

            const { data } = await axios.get(backendurl + '/api/doctor/profile', { headers: { dtoken } })

            if (data.success) {
                setdocdata(data.docdata) 
                // console.log(data.docdata) 
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }


    }

    const getappointment = async () => {

        try {

            const { data } = await axios.get(backendurl + '/api/doctor/appointments', { headers: { dtoken } })

            if (data.success) {

                setappointment(data.appointment)
                // console.log(data.appointment)


            } else {

                toast.error(data.message)
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }


    }

    const cancelappoint = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/doctor/cancel-appointments', { appointmentId }, { headers: { dtoken } })

            if (data.success) {
                toast.success(data.message)
                getappointment()
            } else {
                toast.error(data.message)
            }


        } catch (error) {

            console.log(error) 
            toast.error(error.message)

        }

    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendurl + "/api/doctor/dashboard", {headers: { dtoken },}) 

            if (data.success) {
                setdashData(data.dashData) 
                // console.log(data.dashData) 
            } else {
                toast.error(data.message) 
            }
        } catch (error) {
            console.log(error) 
            toast.error(error.message) 
        }
    } 







    const value = {
        dtoken, setdtoken,
        backendurl, docdata,
        setdocdata, getdocprofile,
        getappointment, appointment,
        setappointment, cancelappoint,
        getDashData,dashData


    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider