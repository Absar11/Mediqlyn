import express from 'express'
import { bookAppointment, cancelappointment, getProfile, listappointment, loginUser, paymentprocess, registerUser, updateProfile, verifypayment } from '../controllers/userController.js'
import authuser from '../middleware/authuser.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()

// route for login and register
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

//  route for user profile
userRouter.get('/get-profile',authuser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authuser,updateProfile)
userRouter.post('/appointment-booking',authuser,bookAppointment)
userRouter.get('/appointments',authuser,listappointment)
userRouter.post('/cancel-appointment',authuser,cancelappointment)
userRouter.post('/online-payment',authuser,paymentprocess)
userRouter.post('/verify-payment',authuser,verifypayment)





export default userRouter