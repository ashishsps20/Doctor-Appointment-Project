import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'


// api for adding doctor by admin
const addDoctor = async (req, res) => {
    try {
        const { name, email, password,speciality, degree, experience, about,  fee, address } = req.body
        const image = req.file
        if (!name || !email || !password || !image || !speciality || !degree || !experience || !about || !fee || !address) {
            return res.status(400).json({ message: "All fields are required" })
        }
        
        // validate email
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email" })
        }
        // validate password
        if(!validator.isStrongPassword(password)){
            return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one symbol" })
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
        res.status(200).json({ message: "Doctor added successfully" })

    } catch (error) {
        console.error('Add doctor error:', error?.message || error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

export default addDoctor