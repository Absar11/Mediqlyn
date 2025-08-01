import { createContext, useEffect, useState } from "react";

import axios from 'axios'
import { toast } from "react-toastify";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencysymbol = '₹'
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const [userData, setuserData] = useState(false)



    const getDoctorsData = async () => {

        try {

            const { data } = await axios.get(backendurl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.error)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const userprofile = async () => {

        try {
            const { data } = await axios.get(backendurl + '/api/user/get-profile', { headers: { token } })

            if (data.success) {
                setuserData(data.userData)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)

        }

    }

   

    const value = {
        doctors,getDoctorsData,
        currencysymbol,
        token, setToken,
        backendurl,
        userData, setuserData,
        userprofile,
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {

        if (token) {

            userprofile()

        } else {
            setuserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider