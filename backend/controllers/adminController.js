import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'


// api for adding doctor by admin
export const addDoctor = async (req, res) => {
    try {
        const { name, email, password,speciality, degree, experience, about,  fee, address } = req.body
        const image = req.file
        if (!name || !email || !password || !image || !speciality || !degree || !experience || !about || !fee || !address) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        
        // validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({ success: false, message: "Invalid email" })
        }

        // quick duplicate email check before expensive operations (upload/hash)
        const existingDoctor = await doctorModel.findOne({ email })
        if (existingDoctor) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }
        // validate password
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one symbol" })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // uploading image to cloudinary
        const imageDataUri = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`
        const uploadedImage = await cloudinary.uploader.upload(imageDataUri, {
            folder: 'doctor-appointment',
            resource_type: 'image'
        })

        const imageUrl = uploadedImage.secure_url

        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.status(200).json({ success: true, message: "Doctor added successfully" })

    } catch (error) {
        console.error('Add doctor error:', error?.message || error)
        
        if (error?.code === 11000 && error.keyValue && error.keyValue.email) {
            return res.status(400).json({ success: false, message: 'Email already exists' })
        }
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


// Api for admin login
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body || {}
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }

        const atoken = jwt.sign( email+password , process.env.JWT_SECRET)
        res.status(200).json({ success: true, message: "Admin logged in successfully",    atoken: atoken })

    } catch (error) {
        console.error('Login admin error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// Api to get doctors list for admin panel
export const allDoctors = async(req,res) => {
    try {
        const doctors = await doctorModel.find().select('-password').sort({ date: -1 })

        res.status(200).json({ success: true, doctors })
    } catch (error) {
        console.error('Get all doctors error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const appointmentsAdmin = async(req,res) => {
    try{
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments })
    } catch(error){
        console.error('Get appointments error:', error?.message || error)
        res.json({ success: false, message: error?.message || "Internal Server Error" })  
    }
}

// Api for appoinment cancellation by admin
export const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId);

    
        // if patient already cancelled then return success true with message already cancelled
        if(appointmentData.cancelled){
            return res.json({success: true, message: 'Appointment already cancelled'})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        //free the slot in doctor model
        const {docId,slotDate,slotTime} = appointmentData;

        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        // Remove the cancelled slot from doctor's booked slots
        if(slots_booked[slotDate]){
            slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
            await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        }

        res.json({success: true, message: 'Appointment Cancelled'})
    } catch (error) {
        console.log(error);      
        res.json({ success: false, message: error.message });
    }
}
// API to get dashboard data for admin panel
export const adminDashboard = async(req,res) => {

    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        const dashData = {
            doctors: doctors.length,
            appointments:appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);      
        res.json({ success: false, message: error.message });
    }
}