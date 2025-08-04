import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";

// API TO REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedpassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for user Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API for profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API TO UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageupload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageURL = imageupload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API TO BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotsTime, slotDate } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor Not Available" });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotsTime)) {
        return res.json({ success: false, message: "slot not available" });
      } else {
        slots_booked[slotDate].push(slotsTime);
      }
    } else {
      slots_booked[slotDate] = [slotsTime];
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;

    const newapoointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotsTime,
      slotDate,
      date: Date.now(),
    });

    await newapoointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments
const listappointment = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel.find({ userId });
    res.json({ success: true, appointments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
const cancelappointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancel: true });

    const { docId, slotDate, slotsTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotsTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    res.json({ success: true, message: "appointment cancelled" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// API to start payment
const paymentprocess = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancel) {
      return res.json({
        success: false,
        message: "Appointment cancelled or not found",
      });
    }

    const option = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };

    const order = await razorpayinstance.orders.create(option);
    res.json({ success: true, order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to verify payment
const verifypayment = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayinstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {
        payment: true,
      });
      res.json({ success: true, message: "Payment Successfull" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ⭐️ API TO ADD REVIEW
const addReview = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { rating, comment, userId } = req.body;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const alreadyReviewed = doctor.reviews.find(
      (r) => r.userId.toString() === userId.toString()
    );

    if (alreadyReviewed) {
      return res.json({
        success: false,
        message: "You have already reviewed this doctor",
      });
    }

    const user = await userModel.findById(userId);

    const review = {
      userId,
      userName: user.name,
      rating: Number(rating),
      comment,
      date: Date.now(),
    };

    doctor.reviews.push(review);
    doctor.averageRating =
      doctor.reviews.reduce((acc, r) => acc + r.rating, 0) /
      doctor.reviews.length;

    await doctor.save();
    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listappointment,
  cancelappointment,
  paymentprocess,
  verifypayment,
  addReview,
};
