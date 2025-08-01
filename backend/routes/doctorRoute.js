import express from 'express'
import { appointmenofdoctor, appointmentcomplete, cancelappointment, dashboard, doctorList, getprofile, loginDoctor, updateprofile } from '../controllers/doctorController.js'
import authdoctor from '../middleware/authDoctor.js'

const doctorRouter = express.Router()

// admin panal
doctorRouter.get('/list', doctorList)

// doctor panal
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/profile', authdoctor,getprofile)
doctorRouter.post('/update-profile', authdoctor,updateprofile)
doctorRouter.get('/appointments', authdoctor,appointmenofdoctor)
doctorRouter.post('/cancel-appointments', authdoctor,cancelappointment)
doctorRouter.post('/completed-appointment', authdoctor,appointmentcomplete)
doctorRouter.get('/dashboard', authdoctor,dashboard)




export default  doctorRouter