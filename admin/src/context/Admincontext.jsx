import axios from "axios";
import { createContext, use, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, Setatoken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, SetDoctors] = useState([])
    const [appointments, SetAppointments] = useState([])
    const [dashdata, setdashdata] = useState(false)

    // connecting to the backend
    const backendurl = import.meta.env.VITE_BACKEND_URL


    const getAllDoctors = async () => {

        try {
            // call api in the backend
            const { data } = await axios.post(backendurl + '/api/admin/all-doctors', {}, { headers: { aToken } })

            if (data.success) {

                SetDoctors(data.doctors)
                // console.log(data.doctors)


            } else {
                toast.error(data.message)
            }

        } catch (error) {

            toast.error(error.message)

        }
    }

    const changeAvailablity = async (docid) => {

        try {

            const { data } = await axios.post(backendurl + '/api/admin/change-availability', { docid }, { headers: { aToken } })

            if (data.success) {

                toast.success(data.message)
                getAllDoctors()

            } else {
                toast.error(data.message)
            }

        } catch (error) {

            toast.error(error.message)


        }
    }

    const getallappointment = async () => {

        try {

            const { data } = await axios.get(backendurl + '/api/admin/appointments', { headers: { aToken } })

            if (data.success) {

                SetAppointments(data.appointment)
                // console.log(data.appointment)

            } else {

            }

        } catch (error) {
            toast.error(error.message)


        }

    }

    const cancelappoint = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendurl + '/api/admin/cancel-appointments', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getallappointment()
            } else {
                toast.error(data.message)
            }


        } catch (error) {

            console.log(error);
            toast.error(error.message)

        }

    }

    const getdashboard = async () => {

        try {
            const { data } = await axios.get(backendurl + '/api/admin/dashboard', { headers: { aToken } })
            if (data.success) {
                setdashdata(data.dashdata)
                // console.log(data.dashData);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)

        }

    }

    const value = {
        aToken, Setatoken,
        backendurl, doctors,
        getAllDoctors, changeAvailablity,
        appointments, SetAppointments,
        getallappointment, cancelappoint,
        dashdata, setdashdata,
        getdashboard

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider