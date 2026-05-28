
import mongoose from 'mongoose'
import doctorModel from '../models/doctorModel.js'

export const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        if (!docId) {
            return res.status(400).json({ success: false, message: 'Doctor id is required' })
        }
        if (!mongoose.Types.ObjectId.isValid(docId)) {
            return res.status(400).json({ success: false, message: 'Invalid doctor id' })
        }
        const docData = await doctorModel.findById(docId)
        if (!docData) {
            return res.status(404).json({ success: false, message: 'Doctor not found' })
        }
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.status(200).json({ success: true, message: "Doctor availability changed successfully" })
    }
    catch (error) {
        console.error('Change availability error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export const doctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find().select(['-password','-email']).sort({ date: -1 }) 
        res.status(200).json({ success: true, doctors })
    } catch (error) {
        console.error('Get doctors list error:', error?.message || error)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}