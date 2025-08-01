import validator from "validator";
import bcrypt from 'bcryptjs';
import { v2 as cloundinary } from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import userModel from "../models/userModel.js";


// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
        const imageFile = req.file


        // checking for all data to add dcotor 
        if (!name || !email || !password || !speciality || !degree || !fees || !experience || !about || !address) {
            return res.json({ success: false, message: "Missing details" })
        }

        // checking email format
        if (!validator.isEmail(email)) {

            return res.json({ success: false, message: "Please enter a valid email" })
        }

        // checking strong password
        if (password.length < 8) {

            return res.json({ success: false, message: "Please enter a Strong Password" })
        }


        // hashing doctor password 
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloundinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({ success: true, message: "Doctor Added" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }



}



// API for Admin login
const loginAdmin = async (req, res) => {

    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {

            res.json({ success: false, message: "invalid credentials" })

        }


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// Api to get all doctor list for admin panel
const alldoctor = async (req, res) => {

    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({ success: true, doctors })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//  API for get all appiontment list 

const appointmentlist = async (req, res) => {

    try {

        const appointment = await appointmentModel.find({})
        res.json({ success: true, appointment })

    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })

    }

}

//  API to cancel a appointment 
const cancelappointment = async (req, res) => {

    try {

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancel: true })

        // releasing doctor slot

        const { docId, slotDate, slotsTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotsTime)

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: 'appointment cancelled' })


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for admin panel

const dashboard = async (req,res) =>{

    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        const dashdata = {
            doctors:doctors.length,
            appointmentss:appointments.length,
            patients:users.length,
            latestAppointment:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashdata})

        
    } catch (error) {

         console.log(error);
        res.json({ success: false, message: error.message })
        
    }
}

export { addDoctor, loginAdmin, alldoctor, appointmentlist, cancelappointment, dashboard }