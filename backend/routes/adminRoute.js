import express from 'express';
import { addDoctor, alldoctor, appointmentlist, cancelappointment, dashboard, loginAdmin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailabilty } from '../controllers/doctorController.js'




const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctors', authAdmin, alldoctor)
adminRouter.post('/change-availability', authAdmin, changeAvailabilty)
adminRouter.get('/appointments', authAdmin, appointmentlist)
adminRouter.post('/cancel-appointments', authAdmin, cancelappointment)
adminRouter.get('/dashboard', authAdmin, dashboard)


export default adminRouter