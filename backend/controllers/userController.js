import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

// api to register user

export const registerUser = async (req, res) => {   
    try {
        const { name, email, password } = req.body || {}
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        // check if user already exists
        if(!validator.isEmail(email)){
            return res.status(400).json({ success: false, message: "Invalid email" })
        }
        if(password.length < 8){
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already registered" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = {
            name,
            email,
            password: hashedPassword
        }
        
        const newUser = new userModel(userData)
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.status(200).json({ success: true, message: "User registered successfully", token })

    } catch (error) {
        if (error?.code === 11000) {
            return res.status(409).json({ success: false, message: "Email already registered" })
        }
        console.log('Register user error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// api for user login

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body || {}
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(401).json({ success: false, message: "User does not exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.status(200).json({ success: true, message: "User logged in successfully", token })
    }
    catch (error) {
        console.log('Login user error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}
